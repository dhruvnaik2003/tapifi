import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: Request) {
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

    const data = await req.json();

    // Whitelist only the fields we allow to be updated via this endpoint
    const updateData: any = {};
    if (typeof data.isProfileActive === 'boolean') updateData.isProfileActive = data.isProfileActive;
    if (data.activeProfile) updateData.activeProfile = data.activeProfile;
    if (typeof data.bio === 'string') updateData.bio = data.bio;
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.lastName) updateData.lastName = data.lastName;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Exclude sensitive data
    const { password: _, verificationOTP: __, ...user } = updatedUser;

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
