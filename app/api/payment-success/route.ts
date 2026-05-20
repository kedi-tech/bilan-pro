import { NextRequest, NextResponse } from 'next/server';
import { generateLicenseKey } from '@/src/lib/license';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    // Expect n8n to forward: { payment_ref, user_id, status }
    const { status, payment_ref } = body ?? {};

    if (status !== 'success' && status !== '200') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    const key = generateLicenseKey('pro');
    const activateUrl = `${BASE_URL}/activate?key=${encodeURIComponent(key)}&ref=${encodeURIComponent(payment_ref ?? '')}`;

    return NextResponse.json({ key, activate_url: activateUrl });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
