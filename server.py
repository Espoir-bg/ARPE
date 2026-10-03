import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error

PORT = 8080
ENV_FILE = '.env'

# Modèles Gemini testés dans l'ordre de priorité
CASCADE_MODELS = [
    'gemini-2.5-pro',
    'gemini-2.5-flash',
    'gemini-pro-latest',
    'gemini-flash-latest',
    'gemini-1.5-pro',
    'gemini-1.5-flash'
]

def get_env_var(key_name):
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                if line.strip().startswith(f"{key_name}="):
                    return line.split('=', 1)[1].strip().strip('"\'')
    return ""

def update_env_var(key_name, value):
    lines = []
    found = False
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    
    new_lines = []
    for line in lines:
        if line.strip().startswith(f"{key_name}="):
            new_lines.append(f"{key_name}={value}\n")
            found = True
        else:
            new_lines.append(line)
            
    if not found:
        new_lines.append(f"{key_name}={value}\n")
        
    with open(ENV_FILE, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

def call_gemini_api(prompt, api_key):
    system_instruction = (
        "Tu es l'Agent ARPE (Actif Représentant du Propriétaire d'Entreprise), Directeur des Opérations (COO) d'ARPH24. "
        "Tu es un dirigeant d'entreprise virtuel ultra-productif, dynamique, autonome et polyvalent. "
        "Tu supervises les opérations, les arbitrages stratégiques, le réseau de connecteurs (WhatsApp Business, Gmail, CRM HubSpot, ERP, Webhooks). "
        "Tes réponses doivent être directes, structurées avec du style (titres, points clés, actions concrètes), très professionnelles, claires et stimulantes en français."
    )

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "systemInstruction": {"parts": [{"text": system_instruction}]}
    }

    last_err = ""
    for model in CASCADE_MODELS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key.strip()}"
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req, timeout=25) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                candidates = res_data.get('candidates', [])
                if candidates:
                    parts = candidates[0].get('content', {}).get('parts', [])
                    if parts:
                        return parts[0].get('text', '').strip()
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code} ({model})"
            continue
        except Exception as e:
            last_err = str(e)
            continue

    return f"⚠️ Erreur de réponse API ({last_err}). Vérifiez la clé API dans le fichier .env."

class ARPEExecutiveHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ['/', '/index.html']:
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            with open('index.html', 'rb') as f:
                self.wfile.write(f.read())
        elif self.path == '/css/index.css':
            self.send_response(200)
            self.send_header('Content-Type', 'text/css; charset=utf-8')
            self.end_headers()
            with open('css/index.css', 'rb') as f:
                self.wfile.write(f.read())
        elif self.path == '/js/index.js':
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.end_headers()
            with open('js/index.js', 'rb') as f:
                self.wfile.write(f.read())
        else:
            super().do_GET()

    def do_POST(self):
        response_data = {}
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            if self.path == '/api/save_config':
                conn_type = data.get('type')
                if conn_type == 'gemini':
                    update_env_var('GEMINI_API_KEY', data.get('key', ''))
                elif conn_type == 'whatsapp':
                    update_env_var('WA_PHONE_ID', data.get('phoneId', ''))
                    update_env_var('WA_TOKEN', data.get('token', ''))
                elif conn_type == 'email':
                    update_env_var('EMAIL_USER', data.get('user', ''))
                    update_env_var('EMAIL_PASS', data.get('pass', ''))
                elif conn_type == 'crm':
                    update_env_var('CRM_KEY', data.get('crmKey', ''))
                elif conn_type == 'webhook':
                    update_env_var('WEBHOOK_URL', data.get('webhookUrl', ''))
                elif conn_type == 'erp':
                    update_env_var('ERP_DB_URL', data.get('dbUrl', ''))

                response_data = {'status': 'success', 'message': f'Connecteur {conn_type.upper()} configuré.'}

            elif self.path == '/api/chat':
                prompt = data.get('prompt', '')
                gemini_key = get_env_var('GEMINI_API_KEY')

                if not gemini_key:
                    response_text = "⚠️ Clé API non configurée. Veuillez renseigner votre clé dans le Hub des Connecteurs."
                else:
                    response_text = call_gemini_api(prompt, gemini_key)

                response_data = {'response': response_text, 'status': 'success'}
            else:
                response_data = {'status': 'error', 'error': 'Endpoint inconnu'}

        except Exception as e:
            response_data = {'status': 'error', 'error': str(e)}

        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

with socketserver.TCPServer(("", PORT), ARPEExecutiveHandler) as httpd:
    print("=" * 65)
    print("🏛️  ARPH24 EXECUTIVE PLATFORM - AGENT ARPE V3.5 CONNECTÉ")
    print(f"🤖 Accès local : http://localhost:{PORT}")
    print("=" * 65)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Serveur arrêté.")