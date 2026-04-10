import { NextRequest, NextResponse } from "next/server";
import { generatePost, savePost, notifyNewPost } from "@/lib/social-media-agent";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  // Vercel Cron authenticatie via CRON_SECRET
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const category = (body as { category?: string }).category;

    const result = await generatePost(category);

    // Fire-and-forget: opslaan en notificeren
    const savePromise = savePost(result.post, result.source);
    const notifyPromise = notifyNewPost(result.post);

    const [postId] = await Promise.all([savePromise, notifyPromise]);

    return NextResponse.json({
      success: true,
      postId,
      source: result.source,
      category: result.post.category,
      hook: result.post.hook,
      usage: result.usage,
    });
  } catch (error) {
    console.error("Social media generation failed:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}

// GET endpoint voor handmatige trigger en status check
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await generatePost();

    const postId = await savePost(result.post, result.source);
    notifyNewPost(result.post).catch(console.error);

    return NextResponse.json({
      success: true,
      postId,
      source: result.source,
      category: result.post.category,
      hook: result.post.hook,
      content: result.post.content,
      hashtags: result.post.hashtags,
    });
  } catch (error) {
    console.error("Social media generation failed:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
