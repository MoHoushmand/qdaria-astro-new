import { z } from 'zod';

// Waitlist form validation schema
export const waitlistSchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),

  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  industry: z.enum([
    'gaming',
    'banking',
    'defense',
    'healthcare',
    'infrastructure',
    'crypto',
    'other'
  ], {
    errorMap: () => ({ message: 'Please select a valid industry' })
  }),

  expectedVolume: z.enum([
    '<10k',
    '10k-100k',
    '100k-1m',
    '1m+'
  ], {
    errorMap: () => ({ message: 'Please select expected volume' })
  }),

  useCase: z.string()
    .max(500, 'Use case must be less than 500 characters')
    .optional(),

  // Optional coupon code for special offers
  couponCode: z.string()
    .max(50, 'Coupon code must be less than 50 characters')
    .optional(),

  ndaConsent: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to the NDA to join the beta program'
    }),

  // Optional UTM tracking
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
