import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email."),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
