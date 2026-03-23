import { createAIProvider, SALES_SYSTEM_PROMPT } from "@/lib/ai";
import { matchIntent, buildIntentResponse } from "@/lib/intent-matcher";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { saveChatLog } from "@/lib/supabase";
import { chatMessageSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

/**
 * Chat API — twee-laags routing strategie
 *
 * Tier 1 (nul API-tokens):
 *   De intent-matcher analyseert het laatste gebruikersbericht.
 *   Voor ~70% van de berichten (prijsvragen, diensten, FAQ) wordt een
 *   statisch antwoord uit de kennisbank geretourneerd — geen Anthropic-call.
 *
 * Tier 2 (Claude API met kennisbank):
 *   Complexe of onbekende vragen worden doorgestuurd naar Claude.
 *   De volledige Arka-kennisbank zit in het systeemprompt, zodat het model
 *   altijd accurate bedrijfsspecifieke antwoorden geeft.
 *
 * Tier 2 wordt ook altijd gebruikt wanneer het gesprek al ≥ 3 berichten
 * heeft (follow-up vragen vereisen context, niet alleen een lookup).
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { success: allowed } = rateLimit(ip, { windowMs: 60_000, max: 20 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Te veel berichten. Probeer het over een minuut opnieuw." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = chatMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ongeldige aanvraag", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { messages, sessionId } = parsed.data;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

    // ── Tier 1: intent matching (geen API-tokens) ─────────────────────────
    // Alleen toepassen op korte gesprekken (≤ 4 berichten) —
    // bij langere gesprekken heeft de gebruiker context-afhankelijke follow-ups.
    const isShortConversation = messages.length <= 4;

    if (isShortConversation && lastUserMessage) {
      const intent = matchIntent(lastUserMessage.content);

      if (intent) {
        const content = buildIntentResponse(intent);

        // Sla ook statische antwoorden op voor analyse (fire-and-forget)
        saveChatLog({
          session_id: sessionId,
          messages: [
            ...messages,
            { role: "assistant", content },
          ],
        }).catch(() => {});

        return NextResponse.json({
          content,
          source: "knowledge-base", // debug-info (niet zichtbaar in UI)
        });
      }
    }

    // ── Tier 2: Claude API met kennisbank ─────────────────────────────────
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "chat_offline", message: "Chat tijdelijk niet beschikbaar" },
        { status: 503 }
      );
    }

    const provider = createAIProvider();
    const response = await provider.chat(messages, SALES_SYSTEM_PROMPT);

    // Sla op (fire-and-forget)
    saveChatLog({
      session_id: sessionId,
      messages: [
        ...messages,
        { role: "assistant", content: response.content },
      ],
    }).catch(() => {});

    return NextResponse.json({
      content: response.content,
      source: "claude-api",
    });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json(
      { error: "Er is een fout opgetreden. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
