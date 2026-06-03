import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendWaitlistNotification } from "@/lib/resend";
import { waitlistSchema } from "@/lib/validations/waitlist.schema";
import type { WaitlistResponse } from "@/types";

// Uses the Postgres driver adapter + Resend — must run on the Node.js runtime.
export const runtime = "nodejs";

function json(body: WaitlistResponse, status = 200): NextResponse<WaitlistResponse> {
  return NextResponse.json(body, { status });
}

/** Trim a header to a non-empty string, or null. */
function headerValue(raw: string | null): string | null {
  const v = raw?.trim();
  return v ? v : null;
}

/**
 * Approximate, IP-derived location from Vercel's edge geo headers. Absent on
 * local dev and for some requests — every field degrades to null.
 */
function geoFrom(request: Request): {
  country: string | null;
  city: string | null;
  region: string | null;
} {
  const cityRaw = headerValue(request.headers.get("x-vercel-ip-city"));
  let city = cityRaw;
  if (cityRaw) {
    // Vercel URL-encodes the city header (e.g. "San%20Francisco").
    try {
      city = decodeURIComponent(cityRaw);
    } catch {
      city = cityRaw;
    }
  }
  return {
    country: headerValue(request.headers.get("x-vercel-ip-country")),
    city,
    region: headerValue(request.headers.get("x-vercel-ip-country-region")),
  };
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
  const geo = geoFrom(request);

  try {
    const existing = await prisma.waitlistSignup.findUnique({ where: { email } });
    if (existing) {
      return json({ success: true, alreadySignedUp: true });
    }

    let signup;
    try {
      signup = await prisma.waitlistSignup.create({
        data: { email, ...geo },
      });
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

    // Their number on the list (the new row is included in the count).
    const position = await prisma.waitlistSignup.count();

    // The signup is already persisted — neither email may fail the request.
    try {
      await sendConfirmationEmail(email);
    } catch (emailErr) {
      console.error("[waitlist] confirmation email failed:", emailErr);
    }

    try {
      await sendWaitlistNotification({
        email,
        createdAt: signup.createdAt,
        country: signup.country,
        city: signup.city,
        region: signup.region,
        source: signup.source,
        position,
      });
    } catch (notifyErr) {
      console.error("[waitlist] admin notification failed:", notifyErr);
    }

    return json({ success: true, alreadySignedUp: false });
  } catch (err) {
    // Never expose raw DB/Resend errors to the client.
    console.error("[waitlist] server error:", err);
    return json({ error: "SERVER_ERROR", message: "Something went wrong. Try again." }, 500);
  }
}
