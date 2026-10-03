import json
import os
import requests

CONFIG_FILE = "config/connectors.json"

class ConnectorHub:
    @staticmethod
    def load_config() -> dict:
        if not os.path.exists(CONFIG_FILE):
            os.makedirs("config", exist_ok=True)
            default_config = {
                "gmail": {"enabled": False, "email": "", "api_token": ""},
                "whatsapp": {"enabled": False, "phone_id": "", "access_token": ""},
                "webhook": {"enabled": False, "endpoint": ""}
            }
            with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                json.dump(default_config, f, indent=4)
            return default_config
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}

    @staticmethod
    def save_config(data: dict) -> str:
        try:
            os.makedirs("config", exist_ok=True)
            with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4)
            return "Configuration des connecteurs mise à jour."
        except Exception as e:
            return f"Erreur de sauvegarde : {str(e)}"

    @staticmethod
    def send_whatsapp_message(phone_number: str, message: str) -> str:
        cfg = ConnectorHub.load_config().get("whatsapp", {})
        if not cfg.get("enabled"):
            return "⚠️ Connecteur WhatsApp non activé ou non configuré dans le Dashboard."
        url = f"https://graph.facebook.com/v18.0/{cfg.get('phone_id')}/messages"
        headers = {
            "Authorization": f"Bearer {cfg.get('access_token')}",
            "Content-Type": "application/json"
        }
        payload = {
            "messaging_product": "whatsapp",
            "to": phone_number,
            "type": "text",
            "text": {"body": message}
        }
        try:
            res = requests.post(url, json=payload, headers=headers, timeout=15)
            return f"Statut WhatsApp : {res.status_code} - {res.text}"
        except Exception as e:
            return f"Erreur envoi WhatsApp : {str(e)}"

    @staticmethod
    def send_email_notification(recipient: str, subject: str, body: str) -> str:
        cfg = ConnectorHub.load_config().get("gmail", {})
        if not cfg.get("enabled"):
            return "⚠️ Connecteur Gmail non activé. Configurez l'accès API dans l'onglet Intégrations."
        return f"📨 [Gmail Simulator] Message adressé à {recipient} | Sujet: {subject} | Statut: Prêt à expédier."

    @staticmethod
    def http_request(url: str, method: str = "GET", headers: dict = None, json_data: dict = None) -> str:
        try:
            res = requests.request(method=method, url=url, headers=headers, json=json_data, timeout=20)
            return f"Code HTTP {res.status_code}\nRéponse:\n{res.text[:1500]}"
        except Exception as e:
            return f"Erreur de requête HTTP : {str(e)}"
