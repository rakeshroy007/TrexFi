"use server";
import nodemailer from 'nodemailer';

export async function sendEmail2( {to, subject, react} ) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
      });

      
      const data = await transporter.sendMail({
        from: '"Some Random Guys 👻" <maddison53@ethereal.email>',
        to: to,
        subject: subject, 
        html: react,
      });

      return { success: true, data }

    } catch (error) {
      console.error("Failed to send email: ", error)
      return { success: false, error }
    }
}


export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}