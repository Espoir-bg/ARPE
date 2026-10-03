import os
import json

class FinanceTool:
    """
    Module financier de PROJECT HELM.
    Gère le journal de caisse, le suivi des dépenses et le solde courant.
    """

    def __init__(self, ledger_file="storage/ledger.json"):
        self.ledger_file = ledger_file
        self._ensure_ledger_exists()

    def _ensure_ledger_exists(self):
        """Initialise le fichier de caisse s'il n'existe pas."""
        if not os.path.exists(self.ledger_file):
            os.makedirs(os.path.dirname(self.ledger_file), exist_ok=True)
            initial_data = {"balance": 500000, "transactions": []}
            with open(self.ledger_file, "w", encoding="utf-8") as f:
                json.dump(initial_data, f, indent=4)

    def get_balance(self):
        """Retourne le solde actuel de l'entreprise."""
        with open(self.ledger_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("balance", 0)

    def record_expense(self, amount: float, description: str):
        """Enregistre une dépense validée dans le livre de caisse."""
        with open(self.ledger_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        if data["balance"] < amount:
            return {"success": False, "reason": "Solde de caisse insuffisant."}

        data["balance"] -= amount
        data["transactions"].append({
            "type": "EXPENSE",
            "amount": amount,
            "description": description
        })

        with open(self.ledger_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

        return {
            "success": True, 
            "new_balance": data["balance"], 
            "message": f"Dépense de {amount} XOF enregistrée pour : {description}"
        }