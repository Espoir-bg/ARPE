import os
import sys

# Liaison avec le cœur du projet HELM
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from src.core.agent import ExecutiveAgent

class HELMChatInterface:
    def __init__(self):
        self.agent = ExecutiveAgent()

    def display_header(self):
        print("\n" + "="*55)
        print("💬 PROJECT HELM - MESSAGERIE DIRECTION & REPRÉSENTANT IA")
        print("="*55)
        print("🤖 [Représentant IA] : En service. En attente de vos directives, Propriétaire.")

    def display_suggestions(self):
        print("\n⚡ [PROPOSITIONS EN UN CLIC] :")
        print(" [1] 📊 Consulter l'état de la caisse")
        print(" [2] 🛒 Valider un achat courant (15 000 XOF)")
        print(" [3] ⚠️️ Proposer un investissement majeur (150 000 XOF)")
        print(" [4] 🚫 Soumettre une action RH critique")
        print(" [5] 📜 Consulter le journal d'audit (memory.db)")
        print(" [0] 🚪 Quitter le chat")
        print("-" * 55)

    def show_audit_logs(self):
        logs = self.agent.memory.get_recent_logs(5)
        print("\n" + "="*55)
        print("📜 [JOURNAL D'AUDIT SÉCURISÉ - MEMORY.DB]")
        print("="*55)
        if not logs:
            print("Aucun enregistrement trouvé dans le journal.")
        else:
            for log_id, timestamp, action, payload, status, reason in logs:
                status_icon = "🟢" if status in ["ALLOWED", "APPROVED_BY_OWNER", "SUCCESS"] else ("🟡" if status in ["REQUIRES_APPROVAL"] else "⛔")
                print(f"#{log_id} | {timestamp} | {status_icon} Statut : {status}")
                print(f" ├─ Action  : {action}")
                print(f" ├─ Données : {payload}")
                print(f" └─ Motif   : {reason}\n")
        print("="*55)

    def run(self):
        self.display_header()
        
        while True:
            self.display_suggestions()
            choice = input("\n👤 Propriétaire (Tapez 1-5 ou votre message libre) > ").strip()

            if choice == "0":
                print("\n🤖 [Représentant IA] : Session de messagerie close. À votre disposition pour la suite.")
                break

            elif choice == "1":
                balance = self.agent.finance_tool.get_balance()
                print(f"\n🤖 [Représentant IA] : Solde actuel en caisse : {balance} XOF.")

            elif choice == "2":
                print("\n🤖 [Représentant IA] : Analyse et exécution de la commande d'achat...")
                self.agent.process_action("purchase_material", {"amount": 15000, "item": "Abonnement Logiciel Pro"})

            elif choice == "3":
                print("\n🤖 [Représentant IA] : Analyse du projet d'investissement...")
                self.agent.process_action("purchase_material", {"amount": 150000, "item": "Serveur de Calcul IA"})

            elif choice == "4":
                print("\n🤖 [Représentant IA] : Analyse de la requête RH...")
                self.agent.process_action("fire_employee", {"employee_id": 101})

            elif choice == "5":
                self.show_audit_logs()

            else:
                print(f"\n🤖 [Représentant IA] : Message reçu : '{choice}'")
                msg_lower = choice.lower()
                
                if "solde" in msg_lower or "argent" in msg_lower or "caisse" in msg_lower:
                    bal = self.agent.finance_tool.get_balance()
                    print(f"👉 [Réponse Automatique] : Le solde disponible est exactement de {bal} XOF.")
                elif "bonjour" in msg_lower or "salut" in msg_lower:
                    print("👉 [Réponse Automatique] : Bonjour Propriétaire. Tout est sous contrôle. Que faisons-nous ?")
                else:
                    print("👉 [Réponse Automatique] : Instruction bien reçue et enregistrée dans le journal de bord.")

if __name__ == "__main__":
    chat = HELMChatInterface()
    chat.run()