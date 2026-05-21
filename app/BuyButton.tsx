'use client';

import { useState } from 'react';

const PAYMENT_WEBHOOK = 'https://n8n.kedi-tech.com/webhook/86eaa4fd-b41b-470c-a00d-199b5dc10a9b';
const PAYMENT_TOKEN = process.env.NEXT_PUBLIC_PAYMENT_TOKEN ?? 'eyJhbGciOiJIUzI1NiJ9.e30.WZd0CghF6oAM6FDUQly6WoZRa6G0XxgWBNQP-MEPUA1';

export default function BuyButton({ email }: { email?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleBuy() {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(PAYMENT_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PAYMENT_TOKEN}`,
        },
        body: JSON.stringify({ amount: 250000, user_id: email ?? '' }),
      });

      const data = await res.json();
      const url: string | undefined = data?.result?.payment_url;

      if (url) {
        window.location.href = url;
      } else {
        setError('Impossible d\'initier le paiement. Réessayez ou contactez le support.');
        setLoading(false);
      }
    } catch {
      setError('Erreur réseau. Vérifiez votre connexion et réessayez.');
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={handleBuy}
        disabled={loading}
        className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-colors ${
          loading
            ? 'bg-blue-400 text-white cursor-not-allowed'
            : 'bg-blue-800 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Redirection vers le paiement…
          </span>
        ) : (
          'Acheter ma licence — 250 000 GNF →'
        )}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
