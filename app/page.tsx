import BuyButton from './BuyButton';

const CHECK = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const features = [
  "Classeurs illimités",
  "Multi-devises (5 devises)",
  "Export PDF & CSV",
  "Tableaux & formules",
  "Rapports avancés",
  "Support prioritaire",
];

const steps = [
  {
    n: "1",
    title: "Obtenez votre clé",
    desc: "Cliquez sur le bouton ci-dessous. Votre clé est générée et affichée instantanément.",
  },
  {
    n: "2",
    title: "Activez dans l'application",
    desc: "Copiez la clé et entrez-la dans BilanPro → Paramètres → Activer une licence.",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-800 rounded-xl flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="leading-none">
              <p className="font-extrabold text-slate-900 text-base">BilanPro</p>
              <p className="text-xs text-slate-400 mt-0.5">Licences</p>
            </div>
          </div>
          <a
            href="mailto:support@bilanpro.app"
            className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
          >
            support@bilanpro.app
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="bg-white border-b border-slate-200 py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Licence BilanPro
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Accédez à tous les outils financiers dont votre activité a besoin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              {["Classeurs illimités", "Export PDF & CSV", "Multi-devises"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-slate-500">
                  <span className="text-green-700">{CHECK}</span>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Card ── */}
        <section className="py-16 px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl border-2 border-blue-800 p-8 shadow-md relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">BilanPro</h2>
                  <p className="text-sm text-slate-400">Accès complet à toutes les fonctionnalités</p>
                </div>
              </div>

              <div className="flex items-end gap-2 mb-8">
                <span className="text-4xl font-black text-blue-800 tabular-nums">
                  250&nbsp;000
                </span>
                <div className="pb-1 leading-none">
                  <p className="text-sm font-bold text-blue-800">GNF</p>
                  <p className="text-xs text-slate-400">/mois</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="text-green-700 shrink-0">{CHECK}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <BuyButton email={email} />
            </div>
          </div>
        </section>

        {/* ── How to activate ── */}
        <section className="bg-white border-t border-slate-200 py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                Comment activer votre licence ?
              </h2>
              <p className="text-slate-500">
                Deux étapes simples pour accéder à toutes les fonctionnalités.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-2xl flex items-center justify-center text-lg font-extrabold mx-auto mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Key format */}
            <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <p className="text-sm text-slate-600 mb-2">
                Format de votre clé de licence :
              </p>
              <code className="bg-white border border-blue-200 rounded-lg px-4 py-2 text-sm font-mono text-blue-800 font-bold tracking-widest shadow-sm">
                PRO-XXXXXXXX-XXXXXXXX
              </code>
              <p className="text-xs text-slate-400 mt-3">
                Entrez cette clé dans BilanPro → Paramètres → Activer une licence
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-extrabold text-slate-900 mb-3">
              Une question ?
            </h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Notre équipe vous répond dans les plus brefs délais.
            </p>
            <a
              href="mailto:support@bilanpro.app"
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contacter le support
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BilanPro. Tous droits réservés.</p>
          <p>
            <a
              href="mailto:support@bilanpro.app"
              className="hover:text-slate-600 transition-colors"
            >
              support@bilanpro.app
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
