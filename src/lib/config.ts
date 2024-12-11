import { z } from 'zod';

const envSchema = z.object({
  // Tawk.to
  TAWKTO_API_KEY: z.string().min(1),
  TAWKTO_EMAIL: z.string().email(),
  TAWKTO_PROPERTY_ID: z.string().min(1),
  TAWKTO_WIDGET_ID: z.string().min(1),

  // OpenAI
  OPENAI_API_KEY: z.string().min(1),

  // Stripe
  STRIPE_PUBLIC_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),

  // App Settings
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_URL: z.string().url(),
});

export type EnvConfig = z.infer<typeof envSchema>;

function loadConfig(): EnvConfig {
  try {
    const config = {
      TAWKTO_API_KEY: import.meta.env.VITE_TAWKTO_API_KEY,
      TAWKTO_EMAIL: import.meta.env.VITE_TAWKTO_EMAIL,
      TAWKTO_PROPERTY_ID: import.meta.env.VITE_TAWKTO_PROPERTY_ID,
      TAWKTO_WIDGET_ID: import.meta.env.VITE_TAWKTO_WIDGET_ID,
      OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
      STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
      STRIPE_SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET,
      NODE_ENV: import.meta.env.MODE,
      API_URL: import.meta.env.VITE_API_URL,
    };

    return envSchema.parse(config);
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw new Error('Invalid configuration');
  }
}

export const config = loadConfig();