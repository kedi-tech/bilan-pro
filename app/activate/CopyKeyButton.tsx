'use client';

import { useState } from 'react';

export default function CopyKeyButton({ licenseKey }: { licenseKey: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const tryClipboard = navigator.clipboard
      ? navigator.clipboard.writeText(licenseKey)
      : Promise.reject();

    tryClipboard
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = licenseKey;
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      })
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  }

  return (
    <button
      onClick={copy}
      className={`w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all ${
        copied
          ? 'bg-green-600 scale-[0.98]'
          : 'bg-blue-800 hover:bg-blue-700 active:scale-[0.98]'
      }`}
    >
      {copied ? '✓ Clé copiée !' : 'Copier la clé'}
    </button>
  );
}
