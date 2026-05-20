import { createHmac } from 'crypto';

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function hmacSig(type: string, nonce: string): string {
  const secret = process.env.LICENSE_SECRET;
  if (!secret) throw new Error('LICENSE_SECRET is not set');
  return createHmac('sha256', secret)
    .update(`${type}:${nonce}`)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
}

function randomSegment(len: number): string {
  // crypto.getRandomValues is available in Node 19+; fall back to Math.random for older runtimes
  return Array.from({ length: len }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join('');
}

export type LicenseType = 'basic' | 'pro';

/** Generate a signed license key that can be verified without a database. */
export function generateLicenseKey(type: LicenseType): string {
  const nonce = randomSegment(8);
  const sig = hmacSig(type, nonce);
  return `${type.toUpperCase()}-${nonce}-${sig}`;
}

/**
 * Validate a license key.
 * Returns the plan type if valid, or 'none' if not.
 */
export function validateLicenseKey(key: string): LicenseType | 'none' {
  const parts = key.trim().toUpperCase().split('-');
  if (parts.length !== 3) return 'none';

  const [prefix, nonce, sig] = parts;
  const type: LicenseType | null =
    prefix === 'PRO' ? 'pro' : prefix === 'BASIC' ? 'basic' : null;
  if (!type) return 'none';
  if (nonce.length !== 8 || sig.length !== 8) return 'none';

  try {
    const expected = hmacSig(type, nonce);
    // Constant-time comparison to prevent timing attacks
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
