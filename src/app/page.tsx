'use client';

import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. BARRE DE NAVIGATION PRINCIPALE */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo : Cerveau Métallique avec Éclairs + Texte ARPH24 Bleu/Blanc */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl border border-blue-500/40 shadow-lg shadow-blue-500/20 group hover:border-blue-400 transition">
              {/* Icône Cerveau Hi-Tech avec Éclairs */}
              <svg className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {/* Éclairs sur les côtés */}
                <path d="M2 10l3-5h3l-2 4h3l-4 5 1-4H2z" fill="currentColor" className="text-blue-500" />
                <path d="M22 10l-3-5h-3l2 4h-3l4 5-1-4h4z" fill="currentColor" className="text-blue-500" />
                {/* Cerveau Central */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-2.2 0-4 1.8-4 4 0 .9.3 1.7.8 2.4-.8.5-1.3 1.4-1.3 2.4 0 1.7 1.3 3 3 3h3m-1.5-11.8c2.2 0 4 1.8 4 4 0 .9-.3 1.7-.8 2.4.8.5 1.3 1.4 1.3 2.4 0 1.7-1.3 3-3 3H12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v11.8M9.5 8.5h5M9 12.5h6" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-sky-200 to-white bg-clip-text text-transparent flex items-center gap-2">
                ARPH24
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  GLOBAL SAAS
                </span>
              </span>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">L'Actif Représentant du Propriétaire H24</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#prestations" className="hover:text-cyan-400 transition">Prestations Exécutives</a>
            <a href="#modele" className="hover:text-cyan-400 transition">Modèle & Essai 1 Mois</a>
            <a href="#tarifs" className="hover:text-cyan-400 transition">Licences & Tarifs</a>
            <a href="/login" className="hover:text-cyan-400 transition">Espace Dirigeant</a>
          </nav>

          {/* Actions : Paramètres (Menu Déroulant) + CTA + Hamburger Mobile */}
          <div className="flex items-center gap-3">
            
            {/* BOUTON PARAMÈTRES (Engrenage ⚙) */}
            <div className="relative">
              <button 
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition flex items-center gap-2"
                title="Paramètres & Configuration"
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:inline text-xs font-bold">Paramètres</span>
              </button>

              {/* MENU DÉROULANT DES PARAMÈTRES */}
              {settingsOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 text-xs font-semibold backdrop-blur-2xl">
                  <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Console de Configuration
                  </div>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>⚙️</span> Configuration Système
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>🤖</span> Gestion des Agents IA
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>⚖️</span> Règles de Gouvernance
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>🛡️</span> Audits & Sécurité
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>🔌</span> Intégrations ERP & API
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>👥</span> Utilisateurs & Permissions
                  </a>
                  <a href="/tarifs" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 transition">
                    <span>💳</span> Abonnement & Facturation
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-cyan-400 bg-blue-500/10 border border-blue-500/20 transition">
                    <span>🌐</span> Réseaux Sociaux & Canal H24
                  </a>
                </div>
              )}
            </div>

            {/* Bouton CTA Inscription */}
            <a 
              href="/tarifs" 
              className="hidden md:inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30 border border-blue-400/30"
            >
              Créer un Compte ↗
            </a>

            {/* Bouton Hamburger Mobile (3 traits) */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>

        {/* Menu Mobile Déroulant */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl">
            <a href="#prestations" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Prestations Exécutives</a>
            <a href="#modele" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Modèle & Essai 1 Mois</a>
            <a href="#tarifs" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Licences & Tarifs</a>
            <a href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Connexion Espace Dirigeant</a>
            <div className="pt-4 border-t border-slate-800">
              <a href="/tarifs" className="block w-full py-3 rounded-xl bg-blue-600 text-white text-center text-xs font-bold shadow-lg">
                Créer mon Compte Entreprise ↗
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950/0 to-slate-950 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            PLATEFORME D'INTELLIGENCE OPÉRATIONNELLE ET D'AUTONOMIE H24
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white">
            Votre entreprise avance. <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
              Votre vision reste aux commandes.
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            ARPH24 est le premier actif représentant du propriétaire conçu pour orchestrer vos équipes, piloter vos finances, sécuriser vos opérations et garantir la continuité H24.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="/tarifs" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition shadow-xl shadow-blue-600/30 border border-blue-400/40 text-center"
            >
              Créer mon Compte (1 Mois Offert) ↗
            </a>
            <a 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm transition border border-slate-800 text-center"
            >
              Explorer le Dashboard ↗
            </a>
          </div>
        </div>
      </section>

      {/* 3. CARTES DE PRESTATIONS ULTRA CONVAINCANTES */}
      <section id="prestations" className="py-20 px-6 border-t border-slate-900 bg-slate-900/20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">PRESTATIONS ÉCOSYSTÈME H24</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Une couverture opérationnelle totale</h2>
            <p className="text-slate-400 text-sm">Découvrez nos modules d'automatisation et d'autonomie paramétrables selon vos besoins.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Prestation 1 : Finance */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 space-y-6 hover:border-blue-500/50 transition shadow-2xl relative group">
              <div className="w-full h-40 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 rounded-2xl border border-blue-500/20 flex flex-col justify-center items-center gap-2 p-4 text-center">
                <span className="text-4xl">📊</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">FINANCE & TRESORERIE H24</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Automatisation Financière</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Rapprochement bancaire instantané, gestion automatique des factures clients/fournisseurs et alertes en temps réel sur les flux de trésorerie.
                </p>
              </div>
            </div>

            {/* Prestation 2 : Logistique */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 space-y-6 hover:border-blue-500/50 transition shadow-2xl relative group">
              <div className="w-full h-40 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 rounded-2xl border border-indigo-500/20 flex flex-col justify-center items-center gap-2 p-4 text-center">
                <span className="text-4xl">📦</span>
                <span className="text-xs font-mono text-indigo-400 font-bold">SUPPLY CHAIN INTELLIGENTE</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Optimisation Logistique</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pilotage prédictif des stocks, réapprovisionnement automatique auprès des fournisseurs B2B et suivi autonome des expéditions.
                </p>
              </div>
            </div>

            {/* Prestation 3 : Gouvernance */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 space-y-6 hover:border-blue-500/50 transition shadow-2xl relative group">
              <div className="w-full h-40 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950 rounded-2xl border border-emerald-500/20 flex flex-col justify-center items-center gap-2 p-4 text-center">
                <span className="text-4xl">🛡️</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">SOUVERAINETÉ & CONFORMITÉ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Sécurité & Gouvernance</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Contrôle d'accès strict selon votre hiérarchie, validation obligatoire des décisions sensibles par le dirigeant et audit d'activité infalsifiable.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MODÈLE ÉCONOMIQUE DE TRANSPARENCE (ACCÈS LIBRE + ESSAI 1 MOIS) */}
      <section id="modele" className="py-20 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">MODÈLE D'ACCÈS & TARIFICATION</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Transparence totale pour les dirigeants</h2>
            <p className="text-slate-400 text-sm">
              Visitez librement notre plateforme et explorez toutes ses prestations. La souscription ne commence que lorsque vous décidez d'activer votre entreprise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-4">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center font-black text-lg border border-blue-500/20">1</div>
              <h3 className="text-lg font-bold text-white">Visite & Consultation Libres</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Découvrez gratuitement toutes les présentations, fonctionnalités et documentations de la plateforme sans aucune restriction de visite.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/40 p-8 rounded-3xl space-y-4 relative shadow-xl shadow-blue-500/10">
              <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommandé
              </div>
              <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center font-black text-lg border border-cyan-500/20">2</div>
              <h3 className="text-lg font-bold text-white">Frais d'Activation + 1 Mois Offert</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Payez vos droits d'accès initiaux pour créer le compte sécurisé de votre entreprise et bénéficiez immédiatement d'un mois d'essai offert à 100%.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-4">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-black text-lg border border-emerald-500/20">3</div>
              <h3 className="text-lg font-bold text-white">Autonomie Continue H24</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Après le premier mois, maintenez l'exécution autonome de votre Représentant H24 via nos offres d'abonnement adaptées à votre taille.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p>© 2026 ARPH24 — L'Actif Représentant du Propriétaire H24. Tous droits réservés.</p>
        <div className="flex justify-center gap-6">
          <a href="/tarifs" className="hover:text-slate-300 transition">Grille Tarifaire</a>
          <a href="/login" className="hover:text-slate-300 transition">Connexion</a>
          <a href="#" className="hover:text-slate-300 transition">Mentions Légales & Sécurité</a>
        </div>
      </footer>

    </div>
  );
}
