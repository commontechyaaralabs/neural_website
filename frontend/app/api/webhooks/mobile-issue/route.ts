import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET = process.env.WEBHOOK_SECRET || '';

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    const signature = request.headers.get('x-signature') || '';
    const computed = crypto.createHmac('sha256', SECRET).update(raw).digest('hex');

    if (!signature || !timingSafeEqual(signature, computed)) {
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(raw);
    console.log('Mobile issue reported:', body);
    
    // TODO: Process the payload - send to monitoring service, create ticket, etc.
    // For now, just log it
    
    return NextResponse.json({ ok: true, message: 'Mobile issue reported successfully' });
  } catch (error) {
    console.error('Error processing mobile issue webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}
