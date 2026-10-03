import json
import os
import urllib.request
import urllib.error

CONFIG_FILE = 'config.json'
api_key = ""

if os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, 'r') as f:
        config = json.load(f)
        api_key = config.get('gemini_api_key', '').strip()

if not api_key:
    api_key = input("Collez votre clé API Gemini : ").strip()

print(f"\n🔑 Clé API détectée : {api_key[:8]}...")

# Modèles standards à tester dans l'ordre
candidate_models = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-pro"
]

prompt = "Bonjour Agent ARPE ! Quelles sont vos missions principales ?"
system_prompt = "Tu es l'Agent ARPE, le Directeur des Opérations (COO) virtuel hautement qualifié de l'entreprise."

success = False

for model in candidate_models:
    print(f"\n🧪 Test de connexion vers Gemini avec le modèle [{model}]...")
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
            print(f"✅ CONNEXION RÉUSSIE AVEC LE MODÈLE : {model}")
            print("="*50)
            print("\n🤖 RÉPONSE EN DIRECT DE L'AGENT ARPE :\n")
            print(text)
            print("\n" + "="*50)
            
            # Sauvegarder le modèle validé dans config.json
            config['working_model'] = model
            config['gemini_api_key'] = api_key
            with open(CONFIG_FILE, 'w') as f:
                json.dump(config, f)
            
            success = True
            break
    except urllib.error.HTTPError as e:
        print(f"❌ Rejet par le serveur ({e.code}) sur {model}")
    except Exception as e:
        print(f"❌ Erreur de connexion : {e}")

if not success:
    print("\n⚠️ Aucun des modèles standards n'a répondu. Vérifiez que la clé API n'a pas de restriction dans Google AI Studio.")
