import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/resend";
import { waitlistSchema } from "@/lib/validations/waitlist.schema";
import type { WaitlistResponse } from "@/types";

// Uses the Postgres driver adapter + Resend — must run on the Node.js runtime.
export const runtime = "nodejs";

function json(body: WaitlistResponse, status = 200): NextResponse<WaitlistResponse> {
  return NextResponse.json(body, { status });
}

export async function POST(
  request: Request,
): Promise<NextResponse<WaitlistResponse>> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "INVALID_EMAIL", message: "Please enter a valid email." }, 400);
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: "INVALID_EMAIL", message: "Please enter a valid email." }, 400);
  }

  const { email } = parsed.data;

  try {
    const existing = await prisma.waitlistSignup.findUnique({ where: { email } });
    if (existing) {
      return json({ success: true, alreadySignedUp: true });
    }

    try {
      await prisma.waitlistSignup.create({ data: { email } });
    } catch (err) {
      // Unique-constraint race: someone signed up the same email concurrently.
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        (err as { code?: string }).code === "P2002"
      ) {
        return json({ success: true, alreadySignedUp: true });
      }
      throw err;
    }

    // The signup is already persisted — email delivery must not fail the request.
    try {
      await sendConfirmationEmail(email);
    } catch (emailErr) {
      console.error("[waitlist] confirmation email failed:", emailErr);
    }

    return json({ success: true, alreadySignedUp: false });
  } catch (err) {
    // Never expose raw DB/Resend errors to the client.
    console.error("[waitlist] server error:", err);
    return json({ error: "SERVER_ERROR", message: "Something went wrong. Try again." }, 500);
  }
}
