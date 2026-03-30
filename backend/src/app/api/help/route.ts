import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // Authenticate Sender
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    
    const decoded = verifyToken(token) as any;
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Retrieve full user profile
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Configure GoDaddy SMTP Mailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port: Number(process.env.SMTP_PORT || 465),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'Tapifi <support@tapifi.in>',
      to: 'support@tapifi.in',
      replyTo: user.email,
      subject: `Help System: Support Request from ${user.firstName} ${user.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2>New Support Request (Tapifi App)</h2>
          <hr />
          <p><strong>From User:</strong> ${user.firstName} ${user.lastName} (${user.email})</p>
          <p><strong>User ID:</strong> ${user.id}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <h3>Message:</h3>
          <div style="padding: 16px; background-color: #f9f9f9; border-left: 4px solid #FF0000; border-radius: 4px;">
            <p style="white-space: pre-wrap;">${question}</p>
          </div>
        </div>
      `,
    };

    // Dispatch raw email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Support ticket executed successfully' });

  } catch (error: any) {
    console.error('Support API Error:', error);
    return NextResponse.json({ error: 'Failed to process support request', details: error.message }, { status: 500 });
  }
}
