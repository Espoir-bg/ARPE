import json
import urllib.request
import urllib.error
import os

CONFIG_FILE = 'config.json'

if not os.path.exists(CONFIG_FILE):
    print("❌ Fichier config.json introuvable. Veuillez d'abord enregistrer votre clé dans l'application.")
    exit(1)

with open(CONFIG_FILE, 'r') as f:
    config = json.load(f)

api_key = config.get('gemini_api_key', '').strip()

if not api_key:
    print("❌ Aucune clé API trouvée dans config.json.")
    exit(1)

print("=" * 60)
print(f"🔍 RECHERCHE ET AUTO-CONNEXION DES MODÈLES GEMINI")
print(f"🔑 Clé détectée : {api_key[:12]}...")
print("=" * 60)

# 1. Lister tous les modèles disponibles via l'API Google
discovered_models = []
endpoints_to_check = [
    ("v1beta", f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"),
    ("v1", f"https://generativelanguage.googleapis.com/v1/models?key={api_key}")
]

for api_ver, list_url in endpoints_to_check:
    print(f"\n📡 Interrogation du catalogue Google ({api_ver})...")
    try:
        req = urllib.request.Request(list_url)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            models_list = data.get('models', [])
            for m in models_list:
                name = m.get('name', '').replace('models/', '')
                methods = m.get('supportedGenerationMethods', [])
                if 'generateContent' in methods:
                    if (api_ver, name) not in discovered_models:
                        discovered_models.append((api_ver, name))
            print(f"  --> {len(models_list)} modèles recensés.")
    except urllib.error.HTTPError as e:
        print(f"  ❌ Erreur HTTP {e.code} sur {api_ver}")
    except Exception as e:
        print(f"  ❌ Erreur de connexion : {e}")

if not discovered_models:
    print("\n❌ Aucun modèle 'generateContent' n'a pu être récupéré depuis l'API Google.")
    print("Vérifiez que la clé API Google AI Studio est valide et active.")
    exit(1)

print(f"\n📋 {len(discovered_models)} candidats identifiés. Test direct de connexion du haut en bas...\n")

# 2. Test direct de génération sur chaque modèle
working_models = []

test_payload = {
    "contents": [{"role": "user", "parts": [{"text": "Bonjour"}]}]
}

for api_ver, model_name in discovered_models:
    url = f"https://generativelanguage.googleapis.com/{api_ver}/models/{model_name}:generateContent?key={api_key}"
    print(f"⏳ Test : {model_name} ({api_ver}) ... ", end="", flush=True)
    
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(test_payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            res_data = json.loads(resp.read().decode('utf-8'))
            candidates = res_data.get('candidates', [])
            if candidates:
                text = candidates[0].get('content', {}).get('parts', [])[0].get('text', '')
                print("✅ [CONNECTÉ & OPÉRATIONNEL]")
                print(f"   💬 Extrait de réponse : \"{text[:50].strip()}...\"")
                working_models.append((api_ver, model_name))
            else:
                print("⚠️ Réponse vide")
    except urllib.error.HTTPError as e:
        print(f"❌ Erreur HTTP {e.code}")
    except Exception as e:
        print(f"❌ {e}")

print("\n" + "=" * 60)

if not working_models:
    print("❌ Aucun modèle n'a répondu favorablement.")
    exit(1)

best_ver, best_model = working_models[0]
print(f"🎉 MODÈLE SÉLECTIONNÉ : {best_model} (API {best_ver})")
print("=" * 60)

# 3. Réécriture automatique de server.py avec la configuration validée
model_list_code = json.dumps([m[1] for m in working_models])

server_code = f'''import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error

PORT = 8080
CONFIG_FILE = 'config.json'

VALID_MODELS = {model_list_code}
API_VERSION = "{best_ver}"

def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r') as f:
                return json.load(f)
        except Exception:
            return {{}}
    return {{}}

def save_config(data):
    config = load_config()
    config.update(data)
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f)

def call_gemini_api(prompt, api_key):
    payload = {{
        "system_instruction": {{
            "parts": [{{
                "text": (
                    "Tu es l'Agent ARPE (Actif Représentant du Propriétaire d'Entreprise), Directeur des Opérations (COO) d'ARPH24.\\n"
                    "Tu réponds directement au Propriétaire en français.\\n"
                    "Adopte un ton professionnel, exécutif, clair et structuré.\\n"
                    "Ne rédige aucun brouillon, aucune analyse de consignes et n'utilise pas l'anglais."
                )
            }}]
        }},
        "contents": [{{
            "role": "user",
            "parts": [={{"text": prompt}}=]
        }}]
    }}

    last_error = ""

    for model_name in VALID_MODELS:
        url = f"https://generativelanguage.googleapis.com/{{API_VERSION}}/models/{{model_name}}:generateContent?key={{api_key}}"
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).replace('={{', '{{').replace('}}=', '}}').encode('utf-8'),
                headers={{'Content-Type': 'application/json'}}
            )

            with urllib.request.urlopen(req, timeout=30) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                candidates = res_data.get('candidates', [])
                if candidates:
                    parts = candidates[0].get('content', {{}}).get('parts', [])
                    if parts:
                        return parts[0].get('text', '').strip()
        except urllib.error.HTTPError as e:
            last_error = f"HTTP {{e.code}}"
            continue
        except Exception as e:
            last_error = str(e)

    return f"⚠️ Impossible de joindre l'API Google ({{last_error}})."

class ARPH24Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ['/', '/index.html']:
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            if os.path.exists('index.html'):
                with open('index.html', 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"Fichier index.html introuvable.")
        else:
            super().do_GET()

    def do_POST(self):
        response_data = {{}}
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            endpoint = self.path

            if endpoint == '/api/save_gemini':
                api_key = data.get('apiKey', '').strip()
                save_config({{'gemini_api_key': api_key}})
                response_data = {{'status': 'success', 'message': 'Clé API enregistrée.'}}

            elif endpoint == '/api/chat':
                prompt = data.get('prompt', '')
                config = load_config()
                gemini_key = config.get('gemini_api_key', '')

                if not gemini_key:
                    response_text = "⚠️ **Clé API non configurée.** Allez dans Connecteurs Hub."
                else:
                    response_text = call_gemini_api(prompt, gemini_key)

                response_data = {{'response': response_text}}
            else:
                response_data = {{'status': 'success'}}

        except Exception as e:
            response_data = {{'error': f"Erreur : {{str(e)}}"}}

        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

with socketserver.TCPServer(("", PORT), ARPH24Handler) as httpd:
    print("=" * 55)
    print("🏛️  PROJET ARPE - Application ARPH24 v1.0")
    print(f"🤖 Serveur Web actif sur : http://localhost:{{PORT}}")
    print(f"⚡ Modèle Gemini principal connecté : {best_model}")
    print("=" * 55 + "\\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\\n👋 Serveur ARPH24 arrêté.")
'''

# Nettoyage syntaxe du template
server_code = server_code.replace('[={', '{').replace('}=]', '}')

with open('server.py', 'w') as f:
    f.write(server_code)

print("\n✨ Fichier server.py mis à jour automatiquement avec succès !")
print("🚀 Vous pouvez maintenant lancer le serveur avec : python3 server.py")
