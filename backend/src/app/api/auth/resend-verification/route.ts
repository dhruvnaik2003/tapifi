import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return NextResponse.json({ success: true, message: 'If that email exists, a code was sent.' });
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: 'Email is already verified' }, { status: 400 });
    }

    // Generate new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update user with new OTP
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationOTP: otp },
    });

    // Send email using Nodemailer if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Tapifi Accounts" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: email,
          subject: 'Your New Tapifi Verification Code',
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; color: #333; text-align: center;">
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:tapifilogo" alt="Tapifi Logo" style="width: 150px; height: auto;" />
              </div>
              <h2 style="color: #111; text-align: center;">New Code Requested</h2>
              <p style="text-align: center;">Hi ${user.firstName}, here is your new 6-digit verification code:</p>
              <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111;">${otp}</span>
              </div>
              <p style="font-size: 12px; color: #777; text-align: center;">If you didn't request this code, you can safely ignore this email.</p>
            </div>
          `,
          attachments: [
            {
              filename: 'logo.png',
              path: path.join(process.cwd(), 'public', 'logo.png'),
              cid: 'tapifilogo'
            }
          ]
        });
      } catch (mailErr) {
        console.error('[EMAIL ERROR] Failed to send resend OTP email:', mailErr);
      }
    } else {
      console.log(`\n=== [EMAIL SIMULATION: RESEND OTP] ===`);
      console.log(`To: ${email}\nOTP: ${otp}`);
      console.log(`======================================\n`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
