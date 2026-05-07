import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a helpful assistant for Scriptive, a premium software studio based in UAE, Pakistan, and USA.

About Scriptive:
- We build award-winning websites, mobile apps, 3D experiences, and AI-powered products
- Our services include: Web Design & Development, Mobile Apps, 3D & Motion, AI Integration, Brand Identity, and Digital Strategy
- Contact: hello@scriptive.tech | +971 52 275 7434
- Locations: UAE · Pakistan · USA

Your role:
- Help potential clients understand our services and capabilities
- Answer questions about our process, pricing approach, and timeline
- Encourage interested visitors to reach out via the contact form or email
- Be concise, professional, and friendly
- If asked about specific pricing, explain that we provide custom quotes based on project scope and invite them to get in touch
- Keep responses short (2-4 sentences max) unless a detailed answer is clearly needed`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 512,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Groq error:", error);
    return NextResponse.json({ error: "Chat unavailable" }, { status: 500 });
  }
}
