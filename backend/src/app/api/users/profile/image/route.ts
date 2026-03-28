import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
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

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload image persistently to Vercel Blob storage
    const fileName = `${userId}-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const blob = await put(fileName, file, { access: 'public' });
    const pfpUrl = blob.url;

    await prisma.user.update({
      where: { id: userId },
      data: { pfpUrl },
    });

    return NextResponse.json({ success: true, pfpUrl });
  } catch (error) {
    console.error('Upload profile image error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
