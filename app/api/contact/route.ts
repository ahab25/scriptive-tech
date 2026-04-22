import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Accepts the contact form payload, validates it, applies a simple
 * edge-friendly rate limit (1 request per IP per 60 s), then sends
 * an email via Resend (https://resend.com).
 *
 * Setup:
 *   1. pnpm add resend
 *   2. Set RESEND_API_KEY and CONTACT_EMAIL_TO in your .env.local
 *
 * If you're not using Resend, replace the send block at the bottom
 * with any SMTP / SaaS call you prefer.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ContactPayload = {
  name: string;
  email: string;
  message: string;
  interests?: string[];
  budget?: string | null;
};

// ---------------------------------------------------------------------------
// Validation — no heavy schema library, just the essentials
// ---------------------------------------------------------------------------
function validate(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") throw new Error("Empty request body.");

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2)
    throw new Error("Name is required (min 2 characters).");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("A valid email address is required.");
  if (typeof message !== "string" || message.trim().length < 10)
    throw new Error("Message is required (min 10 characters).");
  if (name.length > 200 || email.length > 254 || message.length > 5000)
    throw new Error("One or more fields exceeds the maximum allowed length.");

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    interests:
      Array.isArray((body as Record<string, unknown>).interests)
        ? ((body as Record<string, unknown>).interests as string[]).slice(0, 10)
        : [],
    budget:
      typeof (body as Record<string, unknown>).budget === "string"
        ? ((body as Record<string, unknown>).budget as string)
        : null,
  };
}

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (per Vercel Edge Function instance).
// For production use, replace with Upstash Redis or Vercel KV.
// ---------------------------------------------------------------------------
const ipTimestamps = new Map<string, number[]>();

function rateLimit(ip: string, maxPerMinute = 3): boolean {
  const now = Date.now();
  const window = 60_000;
  const prev = (ipTimestamps.get(ip) ?? []).filter((t) => now - t < window);
  if (prev.length >= maxPerMinute) return false;
  ipTimestamps.set(ip, [...prev, now]);
  return true;
}

// ---------------------------------------------------------------------------
// HTML email template
// ---------------------------------------------------------------------------
function emailHtml(p: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: ui-monospace, monospace; background: #06060a; color: #e6e6ef; margin: 0; padding: 32px; }
    .card { border: 1px solid #1e1e2e; border-radius: 12px; padding: 32px; max-width: 560px; margin: 0 auto; background: #0f1018; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: .2em; color: #00e5ff; margin-bottom: 6px; }
    .value { font-size: 15px; color: #e6e6ef; margin-bottom: 24px; line-height: 1.6; }
    .tag { display: inline-block; border: 1px solid #2a2a3a; border-radius: 99px; padding: 2px 10px; font-size: 12px; margin: 2px; color: #8b9ec6; }
    .wordmark { font-size: 11px; text-transform: uppercase; letter-spacing: .3em; color: #8b5cf6; margin-bottom: 24px; }
    hr { border: none; border-top: 1px solid #1e1e2e; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="wordmark">SCRIPTIVE · New Enquiry</div>
    <hr />
    <div class="label">From</div>
    <div class="value">${p.name} &lt;${p.email}&gt;</div>
    <div class="label">Message</div>
    <div class="value">${p.message.replace(/\n/g, "<br/>")}</div>
    ${
      p.interests && p.interests.length > 0
        ? `<div class="label">Interests</div>
    <div class="value">${p.interests.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
        : ""
    }
    ${
      p.budget
        ? `<div class="label">Budget</div>
    <div class="value">${p.budget}</div>`
        : ""
    }
    <hr />
    <div style="font-size:11px; color:#4a4a6a;">Sent via scriptive.agency · ${new Date().toUTCString()}</div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  // Parse + validate
  let payload: ContactPayload;
  try {
    const raw = await req.json();
    payload = validate(raw);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid request." },
      { status: 400 },
    );
  }

  // Guard: env vars must be present
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO ?? "hello@scriptive.agency";

  if (!apiKey) {
    // In development, log and pretend success so you can build without Resend
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact/dev]", payload);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json({ error: "Mail service not configured." }, { status: 503 });
  }

  // Send via Resend REST API (avoids importing the SDK for edge compat)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SCRIPTIVE Contact <no-reply@scriptive.agency>",
        to,
        reply_to: payload.email,
        subject: `New enquiry from ${payload.name}`,
        html: emailHtml(payload),
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Resend error:", err);
      throw new Error("Failed to send email.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Message could not be sent. Please email us directly." },
      { status: 500 },
    );
  }
}

// Reject non-POST methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
