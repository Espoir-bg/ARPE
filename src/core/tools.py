import os
import subprocess
import shutil
import platform
from src.core.integrations import ConnectorHub

class HelmTools:
    @staticmethod
    def execute_shell(command: str) -> str:
        try:
            result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
            output = result.stdout.strip()
            error = result.stderr.strip()
            if error:
                return f"STDOUT:\n{output}\nSTDERR:\n{error}" if output else f"STDERR:\n{error}"
            return output if output else "Commande exécutée avec succès."
        except Exception as e:
            return f"Erreur d'exécution shell : {str(e)}"

    @staticmethod
    def read_file(path: str) -> str:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            return f"Erreur lecture fichier : {str(e)}"

    @staticmethod
    def write_file(path: str, content: str) -> str:
        try:
            if os.path.dirname(path):
                os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return f"Fichier '{path}' écrit avec succès."
        except Exception as e:
            return f"Erreur écriture fichier : {str(e)}"

    @staticmethod
    def list_directory(path: str = ".") -> str:
        try:
            items = os.listdir(path)
            return "\n".join(items) if items else "Répertoire vide."
        except Exception as e:
            return f"Erreur répertoire : {str(e)}"

    @staticmethod
    def get_system_info() -> str:
        try:
            disk = shutil.disk_usage(".")
            return (f"OS: {platform.platform()} | Python: {platform.python_version()} | "
                    f"Disque Libre: {round(disk.free / (1024**3), 2)} GB / {round(disk.total / (1024**3), 2)} GB")
        except Exception as e:
            return f"Erreur système : {str(e)}"

    @staticmethod
    def send_whatsapp(phone_number: str, message: str) -> str:
        return ConnectorHub.send_whatsapp_message(phone_number, message)

    @staticmethod
    def send_email(recipient: str, subject: str, body: str) -> str:
        return ConnectorHub.send_email_notification(recipient, subject, body)

    @staticmethod
    def api_http_call(url: str, method: str = "GET") -> str:
        return ConnectorHub.http_request(url, method)

GEMINI_TOOLS_SCHEMA = [
    {
        "function_declarations": [
            {
                "name": "execute_shell",
                "description": "Exécute une commande Bash/Shell sur le système Termux.",
                "parameters": {"type": "OBJECT", "properties": {"command": {"type": "STRING"}}, "required": ["command"]}
            },
            {
                "name": "read_file",
                "description": "Lit le contenu textuel d'un fichier du projet.",
                "parameters": {"type": "OBJECT", "properties": {"path": {"type": "STRING"}}, "required": ["path"]}
            },
            {
                "name": "write_file",
                "description": "Crée ou modifie un fichier sur le disque.",
                "parameters": {"type": "OBJECT", "properties": {"path": {"type": "STRING"}, "content": {"type": "STRING"}}, "required": ["path", "content"]}
            },
            {
                "name": "list_directory",
                "description": "Liste les fichiers et dossiers d'un répertoire.",
                "parameters": {"type": "OBJECT", "properties": {"path": {"type": "STRING"}}}
            },
            {
                "name": "get_system_info",
                "description": "Affiche l'état du système, le stockage et la mémoire.",
                "parameters": {"type": "OBJECT", "properties": {}}
            },
            {
                "name": "send_whatsapp",
                "description": "Envoye un message WhatsApp via l'API Business configurée.",
                "parameters": {"type": "OBJECT", "properties": {"phone_number": {"type": "STRING"}, "message": {"type": "STRING"}}, "required": ["phone_number", "message"]}
            },
            {
                "name": "send_email",
                "description": "Envoye un e-mail professionnel à un client ou collaborateur.",
                "parameters": {"type": "OBJECT", "properties": {"recipient": {"type": "STRING"}, "subject": {"type": "STRING"}, "body": {"type": "STRING"}}, "required": ["recipient", "subject", "body"]}
            },
            {
                "name": "api_http_call",
                "description": "Effectue une requête REST HTTP vers un service web externe.",
                "parameters": {"type": "OBJECT", "properties": {"url": {"type": "STRING"}, "method": {"type": "STRING"}}, "required": ["url"]}
            }
        ]
    }
]
