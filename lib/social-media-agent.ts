import Anthropic from "@anthropic-ai/sdk";
import { BRAND_IDENTITY, BRAND_VOICE, BRAND_AUDIENCE } from "@/content/brand-context";
import { linkedInPosts, type LinkedInPost } from "@/content/linkedin-posts";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GeneratedPost {
  content: string;
  hashtags: string[];
  category: string;
  hook: string;
}

export interface SocialMediaResult {
  post: GeneratedPost;
  usage?: { input_tokens: number; output_tokens: number };
  source: "generated" | "pre-written";
}

// ─── Supabase opslag ─────────────────────────────────────────────────────────

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

export async function savePost(post: GeneratedPost, source: string): Promise<string | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("social_media_posts")
    .insert({
      content: post.content,
      hashtags: post.hashtags,
      category: post.category,
      hook: post.hook,
      source,
      status: "draft",
      platform: "linkedin",
      created_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save social media post:", error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function getRecentPosts(limit = 10): Promise<string[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data } = await client
    .from("social_media_posts")
    .select("hook")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data?.map((p) => p.hook) ?? [];
}

// ─── Email notificatie ───────────────────────────────────────────────────────

import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function notifyNewPost(post: GeneratedPost): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@arkadigital.nl";
  const to = process.env.RESEND_TO_EMAIL ?? "info@arkadigital.nl";

  await resend.emails.send({
    from,
    to,
    subject: `Nieuwe LinkedIn post klaar: ${post.category}`,
    html: `
      <div style="font-family:sans-serif; max-width:600px; margin:0 auto">
        <h2 style="color:#1E3A5F">Nieuwe LinkedIn post gegenereerd</h2>
        <p><strong>Categorie:</strong> ${escapeHtml(post.category)}</p>
        <p><strong>Hook:</strong> ${escapeHtml(post.hook)}</p>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin:16px 0">
        <div style="background:#f8fafc; padding:16px; border-radius:8px; white-space:pre-wrap; line-height:1.6">${escapeHtml(post.content)}</div>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin:16px 0">
        <p><strong>Hashtags:</strong> ${post.hashtags.map((h) => escapeHtml(h)).join(" ")}</p>
        <p style="color:#64748b; font-size:13px">Review en publiceer deze post op LinkedIn. De post staat als draft in Supabase.</p>
      </div>
    `,
  });
}

// ─── Post generatie via Claude ───────────────────────────────────────────────

const CATEGORIES = [
  "thought-leadership",
  "case-study",
  "praktische-tip",
  "founder-perspectief",
  "behind-the-scenes",
] as const;

const LINKEDIN_SYSTEM_PROMPT = `Je bent Kaan Arslan, oprichter van Arka, een digitaal bureau in Dordrecht.
Je schrijft LinkedIn posts in het Nederlands voor MKB-ondernemers.

## Brand Voice
- Toon: ${BRAND_VOICE.tonePerKanaal.linkedin}
- Persoonlijkheid: ${BRAND_VOICE.persoonlijkheid.slice(0, 3).join(". ")}
- Spreek de lezer aan met "je/jouw" (informeel)
- Actieve stem: "We bouwen jouw website" niet "Jouw website wordt gebouwd"

## Schrijfregels (KRITIEK)
- GEEN em-dashes (worden gezien als AI-gegenereerd)
- Korte zinnen: max 20 woorden per zin
- Concrete cijfers boven vage claims: "+285% meer verkeer" niet "veel meer verkeer"
- Max 1 uitroepteken per post
- Max 0-1 emoji per post
- VERMIJD: "innovatief", "cutting-edge", "next-level", "revolutionair", "uniek", "synergie"
- GEBRUIK: "meetbaar", "concreet", "direct", "persoonlijk", "transparant"
- Minimaliseer AI-vermeldingen, focus op resultaten

## Doelgroep
- Primair: MKB-eigenaren (5-50 medewerkers), 30-55 jaar
- Sectoren: ${BRAND_AUDIENCE.sectoren.join(", ")}
- Regio: Dordrecht + heel Nederland

## Post structuur
1. Hook (eerste 2 regels, cruciaal voor zichtbaarheid)
2. Body (max 1300 karakters, korte alinea's, witruimte tussen alinea's)
3. CTA (eindig met een vraag of zachte call-to-action)
4. Hashtags (3-5, relevant)

## Diensten Arka
- Websites & Webshops (Next.js, conversiegericht)
- SEO & Content (technische SEO, E-E-A-T)
- AI Chatbots & Automatisering (24/7, 70-80% vragen beantwoord)
- Dashboards & Data (realtime KPI's)
- Lead Generation (outbound + inbound)
- Branding & Design (visuele identiteit)

## Resultaten om te noemen
- +285% organisch verkeer in 3 maanden
- +160% reserveringen
- +75% meer leads, 15 uur/week bespaard
- +€1,8M pipeline, offertes van 3 dagen naar 3 uur

## BELANGRIJK
- Schrijf alsof je zelf typt, niet als een AI
- Elke post moet op zichzelf waardevol zijn
- Deel echte inzichten, geen vage motivatie
- Wees specifiek en actionable`;

export async function generatePost(category?: string): Promise<SocialMediaResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Geen API key: pak een willekeurige pre-written post
    return pickPreWrittenPost();
  }

  const recentHooks = await getRecentPosts(10);
  const selectedCategory = category ?? CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  const avoidList = recentHooks.length > 0
    ? `\n\nVermijd overlap met deze recente hooks:\n${recentHooks.map((h) => `- ${h}`).join("\n")}`
    : "";

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: process.env.CLAUDE_MODEL ?? "claude-3-5-haiku-20241022",
    max_tokens: 1024,
    system: LINKEDIN_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Schrijf een LinkedIn post in de categorie "${selectedCategory}".${avoidList}

Geef je antwoord in exact dit JSON formaat (geen markdown codeblokken):
{
  "hook": "De eerste 2 regels van de post",
  "content": "De volledige post inclusief hook",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "category": "${selectedCategory}"
}`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const raw = textBlock && textBlock.type === "text" ? textBlock.text : "";

  try {
    const parsed = JSON.parse(raw) as GeneratedPost;
    return {
      post: parsed,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
      source: "generated",
    };
  } catch {
    // JSON parse mislukt: maak er het beste van
    return {
      post: {
        content: raw,
        hook: raw.split("\n")[0] ?? "",
        hashtags: ["#MKB", "#digitalisering", "#Arka"],
        category: selectedCategory,
      },
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
      source: "generated",
    };
  }
}

function pickPreWrittenPost(): SocialMediaResult {
  const idx = Math.floor(Math.random() * linkedInPosts.length);
  const post = linkedInPosts[idx];
  return {
    post: {
      content: post.content,
      hook: post.hook,
      hashtags: post.hashtags,
      category: post.category,
    },
    source: "pre-written",
  };
}
