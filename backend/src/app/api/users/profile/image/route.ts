import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally to public/uploads directory
    const fileName = `${userId}-${Date.now()}.jpg`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    // Generate absolute URL for React Native `<Image source={{uri}} />`
    const host = req.headers.get('host') || '10.0.2.2:3000';
    const protocol = host.includes('localhost') || host.includes('10.0.2.2') ? 'http' : 'https';
    const pfpUrl = `${protocol}://${host}/uploads/${fileName}`;

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
