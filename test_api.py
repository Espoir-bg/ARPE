import json
import urllib.request
import urllib.error

try:
    with open('config.json', 'r') as f:
        cfg = json.load(f)
        key = cfg.get('gemini_api_key', '')

    print(f"🔑 Clé enregistrée dans config.json : {key[:12]}...")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
    payload = json.dumps({"contents": [{"parts": [{"text": "Bonjour"}]}]}).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})

    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        texte = res['candidates'][0]['content']['parts'][0]['text']
        print("\n✅ SUCCÈS ! Réponse de Google :")
        print(texte)

except urllib.error.HTTPError as e:
    print(f"\n❌ Erreur HTTP Google ({e.code}) :")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"\n❌ Erreur : {e}")
