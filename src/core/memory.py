import sqlite3
import json
import os
from config.settings import DATABASE_PATH, STORAGE_DIR

class MemoryManager:
    """
    Gestionnaire de mémoire persistante de PROJECT HELM.
    Stocke l'historique de toutes les décisions et actions dans une base SQLite.
    """

    def __init__(self):
        os.makedirs(STORAGE_DIR, exist_ok=True)
        self.db_path = DATABASE_PATH
        self._init_db()

    def _init_db(self):
        """Initialise la table des journaux si elle n'existe pas."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action_name TEXT,
                payload TEXT,
                status TEXT,
                reason TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()

    def log_action(self, action_name: str, payload: dict, status: str, reason: str):
        """Enregistre une action exécutée ou refusée dans la base de données."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO logs (action_name, payload, status, reason)
            VALUES (?, ?, ?, ?)
        ''', (action_name, json.dumps(payload), status, reason))
        conn.commit()
        conn.close()

    def get_recent_logs(self, limit=5):
        """Récupère les N derniers enregistrements du journal d'audit."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, timestamp, action_name, payload, status, reason
            FROM logs
            ORDER BY id DESC
            LIMIT ?
        ''', (limit,))
        rows = cursor.fetchall()
        conn.close()
        return rows