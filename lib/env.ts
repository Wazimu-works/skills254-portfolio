import { z } from "zod";

function optionalEnv(value: string | undefined) {
  if (value === undefined) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  MPESA_ENV: z.enum(["sandbox", "production"]).default("sandbox"),
  MPESA_SHORTCODE: z.string().optional(),
  MPESA_PASSKEY: z.string().optional(),
  MPESA_CONSUMER_KEY: z.string().optional(),
  MPESA_CONSUMER_SECRET: z.string().optional(),
  MPESA_CALLBACK_URL: z.string().url().optional(),
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: optionalEnv(process.env.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_SUPABASE_URL: optionalEnv(process.env.NEXT_PUBLIC_SUPABASE_URL),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
});

export const serverEnv = serverEnvSchema.parse({
  SUPABASE_SERVICE_ROLE_KEY: optionalEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  MPESA_ENV: optionalEnv(process.env.MPESA_ENV),
  MPESA_SHORTCODE: optionalEnv(process.env.MPESA_SHORTCODE),
  MPESA_PASSKEY: optionalEnv(process.env.MPESA_PASSKEY),
  MPESA_CONSUMER_KEY: optionalEnv(process.env.MPESA_CONSUMER_KEY),
  MPESA_CONSUMER_SECRET: optionalEnv(process.env.MPESA_CONSUMER_SECRET),
  MPESA_CALLBACK_URL: optionalEnv(process.env.MPESA_CALLBACK_URL),
});
