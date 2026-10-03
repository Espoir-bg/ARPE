import os
import time
from src.core.llm import MultiLLMEngine

SYSTEM_INSTRUCTION = """Tu es le Chief Operating Officer (COO) virtuel de PROJECT HELM.
Ton rôle est de piloter l'automatisation des tâches système, d'inspecter l'environnement Termux, de lire/écrire des fichiers et d'exécuter les commandes demandées.
Tu disposes également de l'outil `get_system_info` pour vérifier la santé de l'environnement.
Tu te souviens des échanges précédents de cette session.
Sois précis, réactif et synthétique dans tes réponses."""

LOG_FILE = "logs/session.log"

def log_interaction(user_input: str, response: str):
    try:
        os.makedirs("logs", exist_ok=True)
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}] PROPRIÉTAIRE: {user_input}\n")
            f.write(f"[{timestamp}] COO HELM: {response}\n")
            f.write("-" * 60 + "\n")
    except Exception:
        pass

def main():
    engine = MultiLLMEngine()
    history = []
    print("==================================================")
    print("🚀 PROJECT HELM - Console COO v1.2 (Diagnostic & Logs)")
    print("Commandes spéciales : 'exit' (quitter), 'clear' (effacer mémoire)")
    print("==================================================\n")

    while True:
        try:
            user_input = input("HELM (Propriétaire) > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ['exit', 'q', 'quit']:
                print("\n👋 Session HELM fermée.")
                break
            if user_input.lower() == 'clear':
                history = []
                print("\n🧹 Mémoire de session réinitialisée.\n")
                continue

            response, history = engine.generate_response(SYSTEM_INSTRUCTION, user_input, history)
            log_interaction(user_input, response)
            
            print(f"\n[COO HELM] :\n{response}\n")
            print("-" * 50)
        except KeyboardInterrupt:
            print("\n👋 Session HELM interrompue.")
            break
        except Exception as e:
            print(f"\n⚠️ Erreur : {str(e)}\n")

if __name__ == "__main__":
    main()
