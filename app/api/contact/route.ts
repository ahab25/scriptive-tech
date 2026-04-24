import nodemailer from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";

// Force Node.js runtime — nodemailer needs net/tls which aren't in Edge
export const runtime = "nodejs";

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
// Validation
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
    interests: Array.isArray((body as Record<string, unknown>).interests)
      ? ((body as Record<string, unknown>).interests as string[]).slice(0, 10)
      : [],
    budget:
      typeof (body as Record<string, unknown>).budget === "string"
        ? ((body as Record<string, unknown>).budget as string)
        : null,
  };
}

// ---------------------------------------------------------------------------
// Rate limiter (in-memory, per instance)
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
  return `<!DOCTYPE html>
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
    ${p.interests && p.interests.length > 0
      ? `<div class="label">Interests</div>
    <div class="value">${p.interests.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
      : ""}
    ${p.budget
      ? `<div class="label">Budget</div>
    <div class="value">${p.budget}</div>`
      : ""}
    <hr />
    <div style="font-size:11px; color:#4a4a6a;">Sent via scriptive.tech · ${new Date().toUTCString()}</div>
  </div>
</body>
</html>`;
}
//--------HTML REPLY TEMPLATE
function autoReplyHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
        .wordmark { font-size: 12px; text-transform: uppercase; letter-spacing: 0.3em; color: #8b5cf6; margin-bottom: 24px; }

  </style>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111111;border:1px solid #222222;border-radius:4px;">
          <tr>
            <td style="padding:40px 48px 32px;border-bottom:1px solid #1e1e1e;">
                            <p class="wordmark">SCRIPTIVE</p>
              <p style="margin:6px 0 0;font-size:11px;color:#666666;letter-spacing:0.1em;">studio / karachi · est. 2020</p>
            </td>
          </tr>
          <tr>
            <td style="padding:48px 48px 40px;">
              <h1 style="margin:0 0 24px;font-size:26px;font-weight:600;color:#f0f0f0;line-height:1.3;letter-spacing:-0.02em;">We got your message.</h1>
<p style="margin:0 0 20px;font-size:15px;color:#888888;line-height:1.8;">Hi ${name}!</p>
<p style="margin:0 0 20px;font-size:15px;color:#888888;line-height:1.8;">We've received your message and are so excited to connect with you. Someone from our team will be in touch with you within <span style="color:#f0f0f0;font-weight:500;">24 to 48 hours</span></p><p style="margin:0 0 32px;font-size:15px;color:#888888;line-height:1.8;">In the meantime, just know that you're in great hands. We can't wait to hear more about your vision and help bring it to life.</p>
<p style="margin:0 0 32px;font-size:15px;color:#888888;line-height:1.8;">Warmly,<br/><span style="color:#f0f0f0;font-weight:500;">Team Scriptive</span><br/><a href="https://www.scriptive.tech" style="color:#8b5cf6;text-decoration:none;border-bottom:1px solid #333333;">www.scriptive.tech</a></p><table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f0f0f0;border-radius:2px;">
                    <a href="https://www.scriptive.tech/#work" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:600;color:#0a0a0a;text-decoration:none;letter-spacing:0.05em;">View our work →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 48px;border-top:1px solid #1e1e1e;background-color:#0d0d0d;">
  <p style="margin:0;font-size:12px;color:#666666;">© 2026 SCRIPTIVE — all rights reserved</p>
  <p style="margin:4px 0 0;font-size:12px;color:#666666;">Karachi · Remote · Worldwide</p>
</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// SMTP transporter (created once per instance)
// ---------------------------------------------------------------------------
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 },
    );
  }

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

  // In development without SMTP vars, log and return success
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact/dev] SMTP not configured — payload logged:", payload);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json(
      { error: "Mail service not configured." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_EMAIL_TO ?? "hello@scriptive.tech";

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SCRIPTIVE Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo: payload.email,
      subject: `New enquiry from ${payload.name}`,
      html: emailHtml(payload),
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}${
        payload.interests?.length ? `\n\nInterests: ${payload.interests.join(", ")}` : ""
      }${payload.budget ? `\nBudget: ${payload.budget}` : ""}`,
    });
     // 2. Send auto-reply to the user
    await transporter.sendMail({
      from: `"SCRIPTIVE" <${process.env.SMTP_USER}>`,
      to: payload.email,
      // subject: `We received your message — SCRIPTIVE`,
            subject: `Hey ${payload.name}, We got your message — SCRIPTIVE`,

      html: autoReplyHtml(payload.name),
      text: `Hi ${payload.name},\n\nThank you for reaching out to SCRIPTIVE. We've received your message and will get back to you within 24 to 48 hours.\n\nBest regards,\nTeam SCRIPTIVE\nscriptive.tech`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] SMTP error:", err);
    return NextResponse.json(
      { error: "Message could not be sent. Please email us directly." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
