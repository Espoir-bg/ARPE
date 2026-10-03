import json
import os
import urllib.request
import urllib.error

CONFIG_FILE = 'config.json'
api_key = ""

if os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, 'r') as f:
        config = json.load(f)
        api_key = config.get('gemini_api_key', '')

if not api_key:
    api_key = input("Collez votre clé API Gemini : ").strip()

print(f"\n🔍 Interrogation des serveurs Google Gemini pour votre clé...")
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        models = data.get('models', [])
        print("\n✅ MODÈLES GEMINI DISPONIBLES ET COMPATIBLES :")
        print("-" * 50)
        found = False
        for m in models:
            methods = m.get('supportedGenerationMethods', [])
            if 'generateContent' in methods:
                print(f" • {m.get('name')}")
                found = True
        if not found:
            print("Aucun modèle 'generateContent' trouvé.")
        print("-" * 50)
except urllib.error.HTTPError as e:
    print(f"\n❌ Erreur API ({e.code}) : La clé API fournie est invalide ou restreinte par Google.")
except Exception as e:
    print(f"\n❌ Erreur : {e}")
