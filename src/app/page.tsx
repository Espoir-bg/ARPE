const capabilities = [
  {
    number: "01",
    title: "Pilotage Intelligent",
    description: "Centralisez les priorités, les décisions et les opérations de votre entreprise dans une interface conçue pour garder une vision claire de votre activité.",
    label: "VISION & CONTRÔLE",
  },
  {
    number: "02",
    title: "Coordination des Équipes",
    description: "Préparez les consignes, organisez les responsabilités et facilitez la circulation de l'information entre les collaborateurs.",
    label: "ÉQUIPES & COLLABORATION",
  },
  {
    number: "03",
    title: "Automatisation des Tâches",
    description: "Structurez les processus répétitifs et préparez des automatisations contrôlées, avec des règles et des validations adaptées à votre entreprise.",
    label: "PROCESSUS & EXÉCUTION",
  },
];

const steps = [
  {
    number: "01",
    title: "Configurez votre Espace",
    description: "Définissez votre entreprise, vos objectifs et les responsabilités que vous souhaitez organiser.",
  },
  {
    number: "02",
    title: "Connectez vos Outils",
    description: "Préparez les intégrations nécessaires à votre activité, selon les services compatibles et les autorisations accordées.",
  },
  {
    number: "03",
    title: "Pilotez vos Opérations",
    description: "Suivez les actions, examinez les résultats et gardez le contrôle des décisions importantes.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <header className="site-header flex items-center justify-between p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            ⚡
          </div>
          <div className="flex flex-col">
            <strong className="text-lg font-black tracking-tight text-slate-900">ARPH24</strong>
            <small className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">L'Actif Représentant du Propriétaire H24</small>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#solution" className="hover:text-blue-600 transition">La Solution</a>
          <a href="#fonctionnalites" className="hover:text-blue-600 transition">Fonctionnalités</a>
          <a href="#tarifs" className="hover:text-blue-600 transition">Offres SaaS</a>
        </nav>
        <a href="#tarifs" className="px-5 py-2.5 bg-slate-950 text-white font-bold text-xs rounded-md hover:bg-blue-600 transition">
          Accès Réservé ↗
        </a>
      </header>

      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6">
          INTELlIGENCE OPÉRATIONNELLE SOUVERAINE
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Votre entreprise avance. <br />
          <span className="text-blue-600">Votre vision reste aux commandes.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          ARPH24 est le centre de commandement exécutif conçu pour aider le dirigeant à orchestrer ses équipes, automatiser ses processus et superviser ses opérations 24h/24.
        </p>
      </section>

      <section id="fonctionnalites" className="py-16 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {capabilities.map((item) => (
            <div key={item.number} className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
              <span className="text-xs font-bold text-blue-600 tracking-wider mb-2 block">{item.label}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
          }
