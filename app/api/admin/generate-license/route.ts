import { NextRequest, NextResponse } from 'next/server';
import { generateLicenseKey, type LicenseType } from '@/src/lib/license';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let plan: LicenseType;
  try {
    const body = await req.json();
    if (body?.plan !== 'basic' && body?.plan !== 'pro') {
      return NextResponse.json({ error: 'plan must be "basic" or "pro"' }, { status: 400 });
    }
    plan = body.plan;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const key = generateLicenseKey(plan);
  return NextResponse.json({ key, plan });
}
