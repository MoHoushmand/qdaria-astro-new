import { z } from 'zod';

/**
 * Password validation rules:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Registration form validation schema
 */
export const registerSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .transform(email => email.toLowerCase()),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: z.string(),

  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional(),

  acceptTerms: z.boolean()
    .refine(val => val === true, {
      message: 'You must accept the terms and conditions'
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .transform(email => email.toLowerCase()),

  password: z.string()
    .min(1, 'Password is required'),

  rememberMe: z.boolean().optional(),
});

/**
 * Password reset request schema
 */
export const resetPasswordRequestSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .transform(email => email.toLowerCase()),
});

/**
 * Password reset schema (with token)
 */
export const resetPasswordSchema = z.object({
  token: z.string()
    .min(1, 'Reset token is required'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Email verification schema
 */
export const verifyEmailSchema = z.object({
  token: z.string()
    .min(1, 'Verification token is required'),
});

/**
 * Type exports
 */
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ResetPasswordRequestData = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
