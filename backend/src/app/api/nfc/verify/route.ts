import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    let uid = rawBody.uid;

    if (!uid) {
      return NextResponse.json({ error: 'NFC UID is required' }, { status: 400 });
    }

    // Force strict database normalization: remove all colons and cast to lowercase natively
    uid = String(uid).replace(/:/g, '').toLowerCase();

    let chip = await prisma.nfcChip.findUnique({
      where: { uid },
    });

    if (!chip) {
      return NextResponse.json({ error: 'This is not a recognized Tapifi hardware chip.' }, { status: 400 });
    }

    if (chip.status === 'activated' || chip.userId) {
      return NextResponse.json({ error: 'This chip is already claimed by another user.' }, { status: 400 });
    }

    // Mark as verified
    const verifiedChip = await prisma.nfcChip.update({
      where: { id: chip.id },
      data: { status: 'verified' },
    });

    return NextResponse.json({ success: true, chip: verifiedChip });
  } catch (error) {
    console.error('NFC Verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
