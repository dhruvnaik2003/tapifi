import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    let uid = rawBody.uid;

    if (!uid) {
      return NextResponse.json({ error: 'NFC UID is required' }, { status: 400 });
    }

    // Force strict database normalization: remove all colons and cast to lowercase natively
    uid = String(uid).replace(/:/g, '').toLowerCase();

    const chip = await prisma.nfcChip.findUnique({ where: { uid } });
    if (!chip) {
      return NextResponse.json({ error: 'Chip not found or unverified' }, { status: 404 });
    }

    if (chip.status === 'activated' && chip.userId) {
      return NextResponse.json({ error: 'Chip already activated' }, { status: 400 });
    }

    // Find user via Authorization Header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    
    const decoded = verifyToken(token) as any;
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const activatedChip = await prisma.nfcChip.update({
      where: { id: chip.id },
      data: { 
        status: 'activated',
        userId: user.id 
      },
    });

    const tapifiUrl = `https://tapifi.in/p/${user.id}`;

    return NextResponse.json({ success: true, chip: activatedChip, tapifiUrl });
  } catch (error) {
    console.error('NFC Activate error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
