import { validateLicenseKey } from '@/src/lib/license';
import CopyKeyButton from './CopyKeyButton';

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  // Validate the key came from our system and hasn't been tampered with
  const isValid = key ? validateLicenseKey(key) !== 'none' : false;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <a href="/" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            ← Retour
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {!key || !isValid ? (
            /* No valid key in URL — payment not yet completed */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 mb-2">
                Paiement requis
              </h1>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Votre clé de licence est générée automatiquement après confirmation du paiement.
                Retournez à la page d&apos;accueil pour acheter votre licence.
              </p>
              <a
                href="/"
                className="inline-block w-full py-3 rounded-xl bg-blue-800 text-white font-bold text-sm hover:bg-blue-700 transition-colors text-center"
              >
                Acheter une licence →
              </a>
            </div>
          ) : (
            /* Valid key received from n8n after payment */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Top band */}
              <div className="px-8 pt-8 pb-6 text-center bg-blue-50">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-green-100 text-green-700">
                  ✓ Paiement confirmé
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
                  Votre clé est prête
                </h1>
                <p className="text-slate-500 text-sm">
                  Copiez-la et entrez-la dans BilanPro pour activer votre licence.
                </p>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* Key display */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Clé de licence
                  </p>
                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
                    <code className="text-lg font-mono font-black tracking-widest break-all text-blue-800">
                      {key}
                    </code>
                  </div>
                </div>

                <CopyKeyButton licenseKey={key} />

                {/* Steps */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Comment activer
                  </p>
                  {[
                    'Copiez la clé ci-dessus',
                    'Ouvrez BilanPro sur votre téléphone',
                    'Paramètres → Activer une licence → Collez la clé',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0 bg-blue-800">
                        {i + 1}
                      </div>
                      <p className="text-slate-600 text-sm">{text}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 text-center pt-2">
                  Conservez cette clé précieusement. Elle ne sera affichée qu&apos;une seule fois.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
