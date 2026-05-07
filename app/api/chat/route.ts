import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

    // Separate last user message from history
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "Chat unavailable" }, { status: 500 });
  }
}
