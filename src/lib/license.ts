import { createHmac } from 'crypto';

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function hmacSig(type: string, expiry: string, nonce: string): string {
  const secret = process.env.LICENSE_SECRET;
  if (!secret) throw new Error('LICENSE_SECRET is not set');
  return createHmac('sha256', secret)
    .update(`${type}:${expiry}:${nonce}`)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
}

function randomSegment(len: number): string {
  return Array.from({ length: len }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join('');
}

function expiryIn1Month(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
}

export type LicenseType = 'basic' | 'pro';

/** Generate a signed license key with a 1-month expiry embedded. */
export function generateLicenseKey(type: LicenseType): string {
  const expiry = expiryIn1Month();
  const nonce = randomSegment(8);
  const sig = hmacSig(type, expiry, nonce);
  return `${type.toUpperCase()}-${expiry}-${nonce}-${sig}`;
}

/**
 * Validate a license key.
 * Returns the plan type if valid and not expired, or 'none'.
 */
export function validateLicenseKey(key: string): LicenseType | 'none' {
  const parts = key.trim().toUpperCase().split('-');
  if (parts.length !== 4) return 'none';

  const [prefix, expiry, nonce, sig] = parts;
  const type: LicenseType | null =
    prefix === 'PRO' ? 'pro' : prefix === 'BASIC' ? 'basic' : null;
  if (!type) return 'none';
  if (!/^\d{8}$/.test(expiry)) return 'none';
  if (nonce.length !== 8 || sig.length !== 8) return 'none';

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  if (expiry < today) return 'none';

  try {
    const expected = hmacSig(type, expiry, nonce);
    if (expected.length !== sig.length) return 'none';
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    }
    return diff === 0 ? type : 'none';
  } catch {
    return 'none';
  }
}
