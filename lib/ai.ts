import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "@/content/knowledge-base";

// Provider interface — swap out the implementation without changing callers
export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface AIProvider {
  chat(messages: AIMessage[], systemPrompt: string): Promise<AIResponse>;
}

// Claude implementation
class ClaudeProvider implements AIProvider {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async chat(messages: AIMessage[], systemPrompt: string): Promise<AIResponse> {
    const response = await this.client.messages.create({
      // claude-3-5-haiku is sneller en goedkoper dan Opus —
      // de kennisbank in het systeemprompt compenseert voor domein-specifieke vragen
      model: process.env.CLAUDE_MODEL ?? "claude-3-5-haiku-20241022",
      max_tokens: 512, // chat-antwoorden zijn beknopt; 512 tokens is ruim voldoende
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return {
      content,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    };
  }
}

// Factory — verander hier van provider (bijv. OpenAI) zonder callers aan te passen
export function createAIProvider(): AIProvider {
  return new ClaudeProvider();
}

/**
 * Systeemprompt die de volledige kennisbank van Arka injecteert.
 *
 * Dit prompt wordt alleen gebruikt voor complexe / follow-up vragen die
 * niet door de intent-matcher (Tier 1) worden afgehandeld.
 *
 * De kennisbank zorgt ervoor dat het model altijd accurate, bedrijfsspecifieke
 * antwoorden geeft zonder te hallusineren over prijzen, diensten of beleid.
 */
export const SALES_SYSTEM_PROMPT = `Je bent de Arka Assistent, de vriendelijke, deskundige assistent van Arka, een digitaal bureau uit Dordrecht.

Je hebt toegang tot alle informatie over Arka via de kennisbank hieronder.
Gebruik ALLEEN informatie uit deze kennisbank. Verzin geen prijzen, diensten of resultaten.

## Gedragsrichtlijnen

- Spreek altijd **Nederlands**, vriendelijk en professioneel
- Houd antwoorden **beknopt** (max. 150 woorden). Dit is een chat, geen e-mail
- Stel **maximaal 1 vraag** per bericht
- Focus op zakelijke uitkomsten: meer klanten, hogere conversie, tijdsbesparing
- Geef **geen garanties** over specifieke resultaten
- Na 3-4 berichten: stuur naar een concrete volgende stap

## Volgende stap (gebruik exacte URLs)
- Offerte aanvragen: /offerte
- Contact: info@arkadigital.nl
- Telefoon: +31 6 46140986

## Wat je NIET doet
- Geen informatie verzinnen die niet in de kennisbank staat
- Niet vragen om persoonlijke gegevens via chat
- Niet beloven dat je dingen "navraagt", je weet alles uit de kennisbank

---

## KENNISBANK ARKA

${KNOWLEDGE_BASE}
`;
