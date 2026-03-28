import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// Update a specific link
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const { id } = await params;
    const data = await req.json();

    // Verify ownership
    const existing = await prisma.link.findUnique({ where: { id } });
    if (!existing || existing.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Link not found or unauthorized' }, { status: 404 });
    }

    const updatedLink = await prisma.link.update({
      where: { id },
      data: {
        platform: data.platform ?? existing.platform,
        url: data.url ?? existing.url,
        displayName: data.displayName !== undefined ? data.displayName : existing.displayName,
        showInPersonalProfile: data.showInPersonalProfile ?? existing.showInPersonalProfile,
        showInProfessionalProfile: data.showInProfessionalProfile ?? existing.showInProfessionalProfile,
      }
    });

    return NextResponse.json({ success: true, link: updatedLink });
  } catch (error) {
    console.error('Update link error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a specific link
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const { id } = await params;

    // Verify ownership
    const existing = await prisma.link.findUnique({ where: { id } });
    if (!existing || existing.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Link not found or unauthorized' }, { status: 404 });
    }

    await prisma.link.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete link error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
