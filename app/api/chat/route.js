import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ── In-memory rate limiter ──────────────────────────────────────────
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 60;           // per IP per hour

const ipStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now > record.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS) return true;

  record.count += 1;
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (now > record.resetAt) ipStore.delete(ip);
  }
}, WINDOW_MS);

// ── Route handler ───────────────────────────────────────────────────
export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again after an hour or call us at 099183 75703.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Trim to last 10 messages to save tokens
    const trimmedMessages = messages.slice(-10);

    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...trimmedMessages,
      ],
      stream: true,
      max_tokens: 300,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please call us at 099183 75703.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}