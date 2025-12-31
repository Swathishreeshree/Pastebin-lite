import { NextResponse } from "next/server";
import kv from "@/lib/kv";
import { nowMs } from "@/lib/time";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const { content, ttl_seconds, max_views } = body;

  // 1. Validate content
  if (typeof content !== "string" || content.trim().length === 0) {
    return badRequest("content must be a non-empty string");
  }

  // 2. Validate ttl_seconds
  let expires_at: number | null = null;
  if (ttl_seconds !== undefined) {
    if (!Number.isInteger(ttl_seconds) || ttl_seconds < 1) {
      return badRequest("ttl_seconds must be an integer >= 1");
    }
    const now = (await nowMs()) * 1;
    expires_at = now + ttl_seconds * 1000;
  }

  // 3. Validate max_views
  let maxViews: number | null = null;
  if (max_views !== undefined) {
    if (!Number.isInteger(max_views) || max_views < 1) {
      return badRequest("max_views must be an integer >= 1");
    }
    maxViews = max_views;
  }

  // 4. Generate ID
  const id = crypto.randomUUID();

  // 5. Build paste object
  const paste = {
    id,
    content,
    created_at: nowMs(),
    expires_at,
    max_views: maxViews,
    views: 0,
  };

  // 6. Store in KV
  await kv.set(`paste:${id}`, paste);

  // 7. Return response
  return NextResponse.json(
    {
      id,
      url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/p/${id}`,
    },
    { status: 201 }
  );
}
