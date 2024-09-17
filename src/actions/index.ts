import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1).max(24, { message: 'Please keep name under 24 characters.' }),
      email: z.string().email({ message: 'Please enter a valid email address.' }),
      message: z.string(),
    }),
    handler: async ({ name, email, message }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: `${name} <${email}>`,
          to: 'delivered@resend.dev',
          subject: `New message from ${name}`,
          html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
          `,
        });

        if (error) {
          console.error('Error sending email:', error);
          return { error: error.message };
        }

        console.log('Email sent successfully:', data);
        return { success: true };
      } catch (error) {
        console.error('Error sending email:', error);
        return { error: error.message };
      }
    },
  }),
};
