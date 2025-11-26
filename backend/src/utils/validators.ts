import { z } from 'zod';

// Auth validators
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
});

// Hook generation validator
export const hookGenerationSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  tone: z.enum(['funny', 'dramatic', 'inspirational', 'urgent', 'casual', 'professional'], {
    errorMap: () => ({ message: 'Invalid tone' }),
  }),
});

export const hookRegenerationSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID is required'),
});

// Subscription validator
export const checkoutSchema = z.object({
  planId: z.enum(['basic', 'pro'], {
    errorMap: () => ({ message: 'Invalid plan ID' }),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type HookGenerationInput = z.infer<typeof hookGenerationSchema>;
export type HookRegenerationInput = z.infer<typeof hookRegenerationSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
