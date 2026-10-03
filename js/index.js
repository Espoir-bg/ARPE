/**
 * Sauvegarde les données du connecteur.
 * @param {string} text - Message utilisateur
 * @param {string} sender - Expéditeur
 * @param {string} type - Type de données (ex: 'erp')
 */
async function saveConnector(text = "", sender = "user", type = "erp") {
    const payload = { text, sender, type };

    if (type === 'erp') {
        payload.dbUrl = "https://api.example.com";
    }

    try {
        const res = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert(`✅ Connecteur ${type.toUpperCase()} enregistré !`);
    } catch (e) {
        alert(`⚠️ Erreur d'enregistrement : ${e.message || e}`);
    }
}