import { Resend } from 'resend';

// Use SUPABASE_URL and ANON_KEY as fallback for checking config
export const resend = import.meta.env.RESEND_API_KEY 
  ? new Resend(import.meta.env.RESEND_API_KEY)
  : null;

export const FROM_EMAIL = import.meta.env.SENDGRID_FROM_EMAIL || 'hello@qdaria.com';
