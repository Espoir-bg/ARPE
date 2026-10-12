export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-md">
            ⚡
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Espace Dirigeant</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Connexion Sécurisée ARPH24</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Connexion sécurisée en cours de liaison avec la base de données."); }}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Adresse Email Professionnelle</label>
            <input 
              type="email" 
              required 
              placeholder="dirigeant@entreprise.com" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">Mot de Passe</label>
              <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">Mot de passe oublié ?</a>
            </div>
            <input 
              type="password" 
              required 
              placeholder="••••••••••••" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            Accéder au Centre de Commandement ↗
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-600">
            Pas encore d'abonnement actif ?{" "}
            <a href="/tarifs" className="text-blue-600 font-bold hover:underline">Découvrir nos offres SaaS</a>
          </p>
        </div>
      </div>
    </main>
  );
            }
