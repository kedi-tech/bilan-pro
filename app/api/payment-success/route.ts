import { NextRequest, NextResponse } from 'next/server';
import { generateLicenseKey } from '@/src/lib/license';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
const DELIVERY_WEBHOOK_URL = process.env.DELIVERY_WEBHOOK_URL ?? '';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    // Expected body: { status, payment_ref, user_id (email), amount? }
    const { status, payment_ref, user_id } = body ?? {};

    if (status !== 'success' && status !== '200') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    const key = generateLicenseKey('pro');
    const activateUrl = `${BASE_URL}/activate?key=${encodeURIComponent(key)}&ref=${encodeURIComponent(payment_ref ?? '')}`;

    // Forward to delivery webhook if configured
    if (DELIVERY_WEBHOOK_URL) {
      await fetch(DELIVERY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, activate_url: activateUrl, email: user_id, payment_ref }),
      }).catch(() => {
        // delivery failure is non-fatal — key is still returned in response
      });
    }

    return NextResponse.json({ key, activate_url: activateUrl, email: user_id });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
