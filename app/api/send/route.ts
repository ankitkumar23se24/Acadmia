import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function POST(req: Request) {
  const body: ContactFormData = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'rktechnical.in <onboarding@resend.dev>', // Must be a verified sender
      to: ['princebind1905@gmail.com'], // Your receiving email
      subject: 'New Query Generated',
      html: `
        <h3>New Message from Contact Form</h3>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ success: false, error });
  }
}
