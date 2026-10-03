import os
import sys

# Connexion aux configurations
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from config.settings import SETTINGS

class PolicyEngine:
    """
    Moteur de règles et de sécurité de PROJECT HELM.
    Évalue si une action est autorisée, bloquée ou nécessite une validation.
    """

    def __init__(self):
        self.max_auto_amount = SETTINGS.get("MAX_AUTONOMOUS_SPEND", 50000)
        self.blocked_actions = SETTINGS.get("BLOCKED_ACTIONS", ["fire_employee"])

    def evaluate(self, action_name: str, payload: dict) -> dict:
        """
        Évalue l'action soumise en fonction des règles établies.
        """
        # 1. Action strictement interdite
        if action_name in self.blocked_actions:
            return {
                "status": "BLOCKED",
                "reason": f"L'action '{action_name}' est strictement interdite à l'IA."
            }

        # 2. Plafond financier
        if action_name == "purchase_material":
            amount = payload.get("amount", 0)
            if amount > self.max_auto_amount:
                return {
                    "status": "REQUIRES_APPROVAL",
                    "reason": f"Montant ({amount} XOF) supérieur au plafond autonome ({self.max_auto_amount} XOF)."
                }

        # 3. Action autorisée
        return {
            "status": "ALLOWED",
            "reason": "Action conforme aux règles de sécurité et aux limites définies."
        }