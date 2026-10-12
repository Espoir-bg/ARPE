export default function DashboardPage() {
  const stats = [
    { label: "Chiffre d'Affaires MTD", value: "128 450 €", change: "+14.2%", status: "up" },
    { label: "Opérations IA Exécutées", value: "1 420", change: "+28%", status: "up" },
    { label: "Anomalies Détectées", value: "0", change: "100% Conforme", status: "neutral" },
    { label: "Taux de Disponibilité", value: "99.99%", change: "H24 Actif", status: "up" },
  ];

  const iaLogs = [
    { id: 1, time: "14:15", agent: "Agent Finance", action: "Rapprochement bancaire effectué — 42 factures clôturées.", status: "Succès" },
    { id: 2, time: "12:30", agent: "Agent Logistique", action: "Alerte stock bas réapprovisionnée auprès du fournisseur B2B.", status: "Succès" },
    { id: 3, time: "09:05", agent: "Agent Gouvernance", action: "Validation requise : Proposition d'avenant contrat client #402.", status: "En attente" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Barre Supérieure du Centre de Commandement */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/30">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              ARPH24 <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/30">L'Actif Représentant H24</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Centre de Commandement du Propriétaire</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Moteur IA Actif & Souverain
          </div>
          <a href="/login" className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 transition">
            Déconnexion
          </a>
        </div>
      </header>

      {/* Contenu Principal du Dashboard */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-8">
        
        {/* Cartes d'Indicateurs Clés */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative overflow-hidden backdrop-blur">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">{s.label}</span>
              <div className="text-3xl font-black text-white mb-2">{s.value}</div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                {s.change}
              </span>
            </div>
          ))}
        </div>

        {/* Console d'Instruction en Langage Naturel */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-400 font-black text-sm">✦ INSTRUCTION AU REPRÉSENTANT EXÉCUTIF</span>
          </div>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Ex : Analyse les performances des ventes cette semaine et prépare un compte-rendu pour le conseil..." 
              className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 flex items-center gap-2">
              Exécuter ↗
            </button>
          </div>
        </div>

        {/* Section Double Column : Journal d'Activité IA & Statut des Connecteurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Journal des Actions Automatisées (2 colonnes) */}
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
              <span>Journal d'Activité des Agents IA</span>
              <span className="text-xs font-normal text-slate-400">Temps Réel</span>
            </h2>

            <div className="space-y-4">
              {iaLogs.map((log) => (
                <div key={log.id} className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-500">{log.time}</span>
                    <div>
                      <strong className="text-xs font-bold text-blue-400 block">{log.agent}</strong>
                      <p className="text-sm text-slate-300">{log.action}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    log.status === "Succès" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connecteurs Logiciels et ERP (1 colonne) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-lg font-bold text-white mb-6">Écosystème Connecté</h2>
            <div className="space-y-4">
              {[
                { name: "ERP & Gestion Stock", status: "Connecté" },
                { name: "Passerelle Financement B2B", status: "Sécurisé" },
                { name: "CRM & Pipelines Clients", status: "Actif" },
                { name: "Services de Messagerie", status: "Actif" },
              ].map((conn, i) => (
                <div key={i} className="flex justify-between items-center p-3.5 bg-slate-950/40 border border-slate-800/50 rounded-xl">
                  <span className="text-xs font-bold text-slate-300">{conn.name}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {conn.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
    }
