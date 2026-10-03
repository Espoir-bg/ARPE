import json
import os
import urllib.request
import urllib.error

CONFIG_FILE = 'config.json'

# 1. Lecture de la clé API
api_key = ""
if os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, 'r') as f:
        config = json.load(f)
        api_key = config.get('gemini_api_key', '').strip()

if not api_key:
    api_key = input("Collez votre clé API Gemini : ").strip()

print(f"\n🔑 Clé API détectée : {api_key[:8]}...")
print("🔍 Récupération en temps réel des modèles attribués à votre clé...")

# 2. Interrogation directe du serveur Google
models_url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
available_models = []

try:
    req = urllib.request.Request(models_url)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        for m in data.get('models', []):
            methods = m.get('supportedGenerationMethods', [])
            name = m.get('name', '').replace('models/', '')
            if 'generateContent' in methods:
                available_models.append(name)
except Exception as e:
    print(f"❌ Erreur lors de la récupération des modèles : {e}")

if not available_models:
    print("⚠️ Aucun modèle compatible trouvé sur votre compte.")
    exit()

print(f"📋 {len(available_models)} modèle(s) de génération détecté(s) : {', '.join(available_models)}\n")

# 3. Test systématique de TOUS les modèles réels trouvés
prompt = "Bonjour Agent ARPE ! Confirmes-tu que la connexion réseau avec Google Gemini fonctionne ?"
system_prompt = "Tu es l'Agent ARPE, le Directeur des Opérations (COO) virtuel hautement qualifié de l'entreprise ARPH24."

success = False

for model in available_models:
    print(f"🧪 Test du modèle réel : [{model}]...")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    
    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"role": "user", "parts": [{"text": prompt}]}]
    }
    
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            text = res_data['candidates'][0]['content']['parts'][0]['text']
            
            print("\n" + "="*50)
            print(f"✅ VICTOIRE ! MODÈLE OPÉRATIONNEL : {model}")
            print("="*50)
            print("\n🤖 RÉPONSE EN DIRECT DE L'AGENT ARPE :\n")
            print(text)
            print("\n" + "="*50)
            
            # Enregistrement du modèle qui a fonctionné
            config['gemini_api_key'] = api_key
            config['working_model'] = model
            with open(CONFIG_FILE, 'w') as f:
                json.dump(config, f)
            print(f"\n💾 Modèle [{model}] sauvegardé avec succès dans config.json !")
            
            success = True
            break
    except urllib.error.HTTPError as e:
        print(f"  ❌ Rejet ({e.code}) sur {model}")
    except Exception as e:
        print(f"  ❌ Erreur : {e}")

if not success:
    print("\n⚠️ Aucun modèle n'a répondu favorablement.")
