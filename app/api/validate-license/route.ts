import { NextRequest, NextResponse } from 'next/server';
import { validateLicenseKey } from '@/src/lib/license';

export async function POST(req: NextRequest) {
  let key: string;
  try {
    const body = await req.json();
    key = typeof body?.key === 'string' ? body.key : '';
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json({ valid: false, type: 'none' });
  }

  const type = validateLicenseKey(key);
  return NextResponse.json({ valid: type !== 'none', type });
}
