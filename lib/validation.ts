import { z } from "zod";

const kenyaPhoneRegex = /^(?:\+254|254|0)?7\d{8}$/;

export const bookingSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().regex(kenyaPhoneRegex, "Use a valid Safaricom number."),
  eventType: z.string().min(2).max(80),
  eventDate: z.string().min(4).max(40),
  location: z.string().min(2).max(120),
  guestCount: z.coerce.number().int().min(1).max(50000),
  packageName: z.string().min(2).max(120),
  notes: z.string().max(1000).optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(""),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(2000),
});

export const stkPushSchema = z.object({
  phone: z.string().regex(kenyaPhoneRegex, "Use a valid Safaricom number."),
  amount: z.coerce.number().int().min(1).max(150000),
  paymentType: z.enum(["course", "booking", "mixtape"]),
  referenceId: z.string().uuid().optional(),
  description: z.string().min(3).max(120),
});

export function normalizeKenyanPhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("7")) return `254${digits}`;
  return digits;
}
