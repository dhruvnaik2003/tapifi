import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: 'NFC UID is required' }, { status: 400 });
    }

    // Check if chip already exists
    const existingChip = await prisma.nfcChip.findUnique({
      where: { uid },
    });

    if (existingChip) {
      return NextResponse.json(
        { error: 'This chip is already registered in your inventory.' },
        { status: 400 }
      );
    }

    // Create new unverified chip
    const newChip = await prisma.nfcChip.create({
      data: {
        uid,
        status: 'unverified',
      },
    });

    return NextResponse.json({ success: true, chip: newChip });
  } catch (error) {
    console.error('Add NFC Chip error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
