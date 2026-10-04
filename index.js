document.addEventListener('DOMContentLoaded', () => {
  // Navigation entre Onglets
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Notification Toast
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Moteur des Modales (Ouverture & Fermeture)
  const modals = document.querySelectorAll('.modal');
  const openButtons = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-cancel');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  const btnOpenGov = document.getElementById('btn-open-governance');
  if (btnOpenGov) {
    btnOpenGov.addEventListener('click', () => {
      document.getElementById('modal-governance').classList.add('active');
    });
  }

  // Formulaire de Gouvernance
  const formGov = document.getElementById('form-governance');
  formGov.addEventListener('submit', (e) => {
    e.preventDefault();
    const govData = {
      level: document.getElementById('gov-autonomy-level').value,
      maxAmount: document.getElementById('gov-max-amount').value,
      waApproval: document.getElementById('gov-whatsapp-approval').checked
    };
    localStorage.setItem('arpe_governance', JSON.stringify(govData));
    updateGovernanceUI(govData);
    document.getElementById('modal-governance').classList.remove('active');
    showToast('Politique de gouvernance mise à jour !');
  });

  function updateGovernanceUI(data) {
    if (!data) return;
    const modeMap = {
      full: 'Autonomie Totale (Sans validation)',
      capped: 'Autonome sous Plafond',
      restricted: 'Validation Obligatoire'
    };
    document.getElementById('summary-autonomy-mode').textContent = modeMap[data.level] || data.level;
    document.getElementById('summary-max-amount').textContent = Number(data.maxAmount).toLocaleString('fr-FR') + ' XOF';
    document.getElementById('summary-whatsapp-approval').textContent = data.waApproval ? 'Activée (Validation requise)' : 'Désactivée (Automatique)';
  }

  const savedGov = localStorage.getItem('arpe_governance');
  if (savedGov) {
    const data = JSON.parse(savedGov);
    document.getElementById('gov-autonomy-level').value = data.level || 'capped';
    document.getElementById('gov-max-amount').value = data.maxAmount || 500000;
    document.getElementById('gov-whatsapp-approval').checked = !!data.waApproval;
    updateGovernanceUI(data);
  }

  // Gestion des Connecteurs
  const connectors = [
    { formId: 'form-erp', modalId: 'modal-erp', badgeId: 'badge-erp', storageKey: 'arpe_erp', btn: 'modal-erp' },
    { formId: 'form-crm', modalId: 'modal-crm', badgeId: 'badge-crm', storageKey: 'arpe_crm', btn: 'modal-crm' },
    { formId: 'form-whatsapp', modalId: 'modal-whatsapp', badgeId: 'badge-whatsapp', storageKey: 'arpe_whatsapp', btn: 'modal-whatsapp' },
    { formId: 'form-email', modalId: 'modal-email', badgeId: 'badge-email', storageKey: 'arpe_email', btn: 'modal-email' }
  ];

  connectors.forEach(c => {
    const form = document.getElementById(c.formId);
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem(c.storageKey, 'connected');
        setConnectorBadge(c.badgeId, true, c.btn);
        document.getElementById(c.modalId).classList.remove('active');
        showToast('Connecteur configuré et activé !');
      });
    }

    if (localStorage.getItem(c.storageKey) === 'connected') {
      setConnectorBadge(c.badgeId, true, c.btn);
    }
  });

  function setConnectorBadge(badgeId, isConnected, modalBtnId) {
    const badge = document.getElementById(badgeId);
    if (!badge) return;
    if (isConnected) {
      badge.textContent = 'Connecté';
      badge.className = 'badge badge-connected';
      const btn = document.querySelector(`[data-modal="${modalBtnId}"]`);
      if (btn) {
        btn.textContent = 'Gérer';
        btn.className = 'btn btn-secondary btn-manage';
      }
    }
  }

  // Moteur de Chat Terminal
  const chatHistory = document.getElementById('chat-history');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  const defaultMessages = [
    { sender: 'ai', text: 'Bonjour Espoir. Je suis l\'Agent ARPH24. Mon module d\'autonomie est prêt. Vos connecteurs ERP, CRM, Email et WhatsApp peuvent être configurés dans l\'onglet dédié.' },
    { sender: 'user', text: 'Bonjour Agent ARPE, quelles sont tes missions actuelles ?' },
    { sender: 'ai', text: 'Je supervise les flux entrants de vos connecteurs, j\'exécute la relance des opportunités CRM et je maintiens le journal d\'audit selon vos règles de gouvernance.' }
  ];

  function loadChat() {
    const savedChat = localStorage.getItem('arpe_chat');
    const messages = savedChat ? JSON.parse(savedChat) : defaultMessages;
    chatHistory.innerHTML = '';
    messages.forEach(m => appendMessageUI(m.sender, m.text));
  }

  function appendMessageUI(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg msg-${sender}`;
    const avatar = sender === 'ai' ? '🤖' : '👤';
    msgDiv.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">${text}</div>
    `;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessageUI('user', text);
    chatInput.value = '';
    saveChatMessage('user', text);

    setTimeout(() => {
      let aiReply = "Instruction reçue et enregistrée dans le journal d'exécution.";
      const lower = text.toLowerCase();

      if (lower.includes('statut') || lower.includes('état')) {
        aiReply = "Système ARPH24 V3.5 opérationnel. Tous les services configurés sont sous le contrôle de la politique de gouvernance.";
      } else if (lower.includes('gouvernance') || lower.includes('regle') || lower.includes('règle')) {
        const gov = JSON.parse(localStorage.getItem('arpe_governance') || '{}');
        const limit = gov.maxAmount ? Number(gov.maxAmount).toLocaleString('fr-FR') + ' XOF' : '500 000 XOF';
        aiReply = `Gouvernance active : Plafond d'exécution fixé à ${limit}. Toute transaction supérieure demandera votre approbation.`;
      } else if (lower.includes('whatsapp') || lower.includes('crm') || lower.includes('erp')) {
        aiReply = "Synchronisation des connecteurs en cours... Les flux d'intégration sont actifs.";
      }

      appendMessageUI('ai', aiReply);
      saveChatMessage('ai', aiReply);
    }, 500);
  }

  function saveChatMessage(sender, text) {
    const savedChat = localStorage.getItem('arpe_chat');
    const messages = savedChat ? JSON.parse(savedChat) : defaultMessages;
    messages.push({ sender, text });
    localStorage.setItem('arpe_chat', JSON.stringify(messages));
  }

  sendBtn.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  loadChat();
});
