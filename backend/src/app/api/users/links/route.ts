import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// Fetch all links for the authenticated user
export async function GET(req: Request) {
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

    const links = await prisma.link.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, links });
  } catch (error) {
    console.error('Fetch links error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create a new link for the authenticated user
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

    const data = await req.json();

    if (!data.url || !data.platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newLink = await prisma.link.create({
      data: {
        userId: decoded.userId,
        platform: data.platform,
        url: data.url,
        displayName: data.displayName || null,
        showInPersonalProfile: typeof data.showInPersonalProfile === 'boolean' ? data.showInPersonalProfile : true,
        showInProfessionalProfile: typeof data.showInProfessionalProfile === 'boolean' ? data.showInProfessionalProfile : true,
      }
    });

    return NextResponse.json({ success: true, link: newLink });
  } catch (error) {
    console.error('Create link error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
