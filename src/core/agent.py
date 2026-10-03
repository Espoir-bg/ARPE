import os
import sys

# Connexion aux modules du projet
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from src.core.policy_engine import PolicyEngine
from src.core.memory import MemoryManager
from src.tools.finance import FinanceTool

class ExecutiveAgent:
    def __init__(self):
        self.policy_engine = PolicyEngine()
        self.memory = MemoryManager()
        self.finance_tool = FinanceTool()

    def _execute_expense(self, amount: float, description: str):
        """Débite la caisse si les fonds sont suffisants."""
        res = self.finance_tool.record_expense(amount, description)
        if res["success"]:
            print(f"💰 [FINANCE] {res['message']} (Nouveau solde : {res['new_balance']} XOF)")
        else:
            print(f"⚠️ [FINANCE ÉCHEC] {res['reason']}")

    def process_action(self, action_name: str, payload: dict):
        print(f"\n[ORCHESTRATEUR] Analyse de l'action : '{action_name}'...")
        
        # Évaluation des règles de sécurité
        decision = self.policy_engine.evaluate(action_name, payload)
        status = decision["status"]
        reason = decision["reason"]
        
        # 1. Action AUTORISÉE automatiquement
        if status == "ALLOWED":
            print(f"🟢 [AUTORISÉ] {reason}")
            self.memory.log_action(action_name, payload, status, reason)
            
            if action_name == "purchase_material":
                self._execute_expense(payload.get("amount", 0), payload.get("item", "Achat"))
            return {"status": "SUCCESS", "message": reason}
            
        # 2. Action NÉCESSITANT UNE VALIDATION (Human-in-the-Loop)
        elif status == "REQUIRES_APPROVAL":
            print(f"🟡 [ATTENTION] {reason}")
            
            choice = input("\n❓ Souhaitez-vous autoriser cette opération exceptionnelle ? [O]ui / [N]on > ").strip().upper()
            
            if choice == "O":
                print("✅ [VALIDATION ACCORDÉE] Exécution de la décision du Propriétaire...")
                self.memory.log_action(action_name, payload, "APPROVED_BY_OWNER", reason)
                
                if action_name == "purchase_material":
                    self._execute_expense(payload.get("amount", 0), payload.get("item", "Achat"))
                return {"status": "APPROVED", "message": "Validé par le propriétaire."}
            else:
                print("❌ [REFUSÉ] L'opération a été annulée conformément à votre ordre.")
                self.memory.log_action(action_name, payload, "REJECTED_BY_OWNER", reason)
                return {"status": "REJECTED", "message": "Refusé par le propriétaire."}
            
        # 3. Action BLOQUÉE (Interdiction absolue)
        elif status == "BLOCKED":
            print(f"⛔ [BLOQUÉ] {reason}")
            self.memory.log_action(action_name, payload, status, reason)
            return {"status": "DENIED", "message": reason}

if __name__ == "__main__":
    agent = ExecutiveAgent()
    print("Agent prêt.")