import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        verificationOTP: otp,
        emailVerified: false,
      },
    });

    // Initialize Nodemailer if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Tapifi Accounts" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: email,
          subject: 'Your Tapifi Verification Code',
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; color: #333 text-align: center;">
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:tapifilogo" alt="Tapifi Logo" style="width: 150px; height: auto;" />
              </div>
              <h2 style="color: #111; text-align: center;">Welcome to Tapifi, ${firstName}!</h2>
              <p style="text-align: center;">Thanks for registering. To verify your email address, please enter the following 6-digit code into your Tapifi App:</p>
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
              cid: 'tapifilogo' // same cid value as in the html img src
            }
          ]
        });
        console.log(`[EMAIL DISPATCHED] OTP successfully sent to ${email}`);
      } catch (mailErr) {
        console.error('[EMAIL ERROR] Failed to push email via Nodemailer. Reason:', mailErr);
        // Non-blocking: Still return 200 OK so the user doesn't get hardlocked if SMTP is misconfigured during local dev.
      }
    } else {
      // SIMULATE SENDING EMAIL: By natively logging to server terminal (Fallback if .env missing)
      console.log(`\n==========================================`);
      console.log(`[EMAIL SIMULATION] MISSING SMTP_USER IN .ENV`);
      console.log(`[EMAIL SIMULATION] To: ${email}`);
      console.log(`VERIFICATION OTP: ${otp}`);
      console.log(`==========================================\n`);
    }

    const token = signToken({ userId: user.id });

    // Exclude password and sensitive OTP from response
    const { password: _, verificationOTP: __, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
