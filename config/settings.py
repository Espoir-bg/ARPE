import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

STORAGE_DIR = BASE_DIR / "storage"
DATABASE_PATH = STORAGE_DIR / "memory.db"
LEDGER_PATH = STORAGE_DIR / "ledger.json"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", None)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", None)
HELM_ENV = os.getenv("HELM_ENV", "development")

def check_security_status():
    active = []
    if GEMINI_API_KEY and not GEMINI_API_KEY.startswith("votre_"):
        active.append("Gemini")
    if OPENAI_API_KEY and not OPENAI_API_KEY.startswith("votre_"):
        active.append("OpenAI")
    
    if active:
        return f"🔒 Moteurs actifs en mémoire serveur : {', '.join(active)}"
    return "⚠️ Aucune clé API active détectée."
