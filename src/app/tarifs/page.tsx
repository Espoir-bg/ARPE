export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4 border border-blue-500/20">
          ACCÈS STRICTEMENT PAYANT & SOUVERAIN
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Investissez dans le pilotage d'élite
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Choisissez l'offre adaptée à la taille de votre structure. Accès complet aux agents IA, aux intégrations et au centre de commandement sécurisé.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Offre Standard */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 flex flex-col justify-between backdrop-blur">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-200">Licence Entrepreneur</h3>
              <span className="px-3 py-1 bg-slate-700 text-xs font-semibold rounded-full text-slate-300">Mensuel</span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-black">99 €</span>
              <span className="text-slate-400 text-sm"> / mois</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-2">✓ 1 Espace Entreprise géré</li>
              <li className="flex items-center gap-2">✓ Assistant IA Exécutif H24</li>
              <li className="flex items-center gap-2">✓ Rapports et synthèses automatisés</li>
              <li className="flex items-center gap-2">✓ Support technique prioritaire</li>
            </ul>
          </div>
          <a 
            href="/login" 
            className="w-full py-3.5 bg-blue-600 text-white font-bold text-center text-sm rounded-xl hover:bg-blue-500 transition shadow-lg"
          >
            Souscrire à l'Offre Entrepreneur ↗
          </a>
        </div>

        {/* Offre Enterprise / Internationale */}
        <div className="bg-gradient-to-b from-blue-900/40 to-slate-800/80 border-2 border-blue-500 rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl">
          <div className="absolute -top-3 right-8 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            Recommandé Global
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Licence Corporation International</h3>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full">Annuel / Multi-Régions</span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-black">890 €</span>
              <span className="text-slate-400 text-sm"> / an</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-200 mb-8">
              <li className="flex items-center gap-2">✓ Multi-entreprises et multi-utilisateurs</li>
              <li className="flex items-center gap-2">✓ Gouvernance avancée & permissions strictes</li>
              <li className="flex items-center gap-2">✓ Connexions ERP, CRM et API illimitées</li>
              <li className="flex items-center gap-2">✓ Accompagnement architecture dédié</li>
            </ul>
          </div>
          <a 
            href="/login" 
            className="w-full py-3.5 bg-white text-slate-950 font-bold text-center text-sm rounded-xl hover:bg-slate-100 transition shadow-lg"
          >
            Activer la Licence Corporation ↗
          </a>
        </div>
      </div>
    </main>
  );
                }
