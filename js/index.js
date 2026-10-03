document.addEventListener("DOMContentLoaded", () => {
    // Navigation entre Onglets
    const navButtons = document.querySelectorAll(".nav-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");

            navButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(tabId)?.classList.add("active");
        });
    });

    // Envoi de messages
    const sendBtn = document.getElementById("sendBtn");
    const promptInput = document.getElementById("promptInput");
    const chatBox = document.getElementById("chatBox");

    function sendMessage() {
        const text = promptInput.value.trim();
        if (!text) return;

        // Message Utilisateur
        const userDiv = document.createElement("div");
        userDiv.className = "message user-msg";
        userDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-user"></i></div>
            <div class="bubble">${escapeHtml(text)}</div>
        `;
        chatBox.appendChild(userDiv);
        promptInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // Réponse simulée de l'Agent IA ARPH24
        setTimeout(() => {
            const aiDiv = document.createElement("div");
            aiDiv.className = "message system-msg";
            aiDiv.innerHTML = `
                <div class="avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="bubble"><strong>ARPH24 :</strong> Instruction reçue et prise en compte dans le journal d'exécution.</div>
            `;
            chatBox.appendChild(aiDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);
    }

    sendBtn?.addEventListener("click", sendMessage);
    promptInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

/**
 * Gestionnaire de configuration des connecteurs
 * @param {string} type - Nom du service (ERP, CRM, WhatsApp, Email)
 */
async function configureConnector(type = "Inconnu") {
    const payload = {
        connector: type,
        timestamp: new Date().toISOString()
    };

    try {
        console.log(`[Connecteur] Synchronisation du module ${type}...`, payload);
        alert(`⚙️ Module ${type} : Prêt pour la synchronisation.`);
    } catch (error) {
        console.error(`Erreur connecteur ${type}:`, error);
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[m]);
}

window.configureConnector = configureConnector;
