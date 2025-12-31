import { NextResponse } from "next/server";
import kv from "@/lib/kv";

type Paste = {
  id: string;
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
};

function getNowMs(request: Request): number {
  if (process.env.TEST_MODE === "1") {
    const headerNow = request.headers.get("x-test-now-ms");
    if (headerNow) {
      return Number(headerNow);
    }
  }
  return Date.now();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  // 1. Read paste
  const paste = await kv.get<Paste>(`paste:${id}`);

  // 2. Not found
  if (!paste) {
    return NextResponse.json({ error: "Paste not found" }, { status: 404 });
  }
  // 2.5 Check TTL expiry
  const now = getNowMs(request);

  if (paste.expires_at !== null && now >= paste.expires_at) {
    return NextResponse.json({ error: "Paste expired" }, { status: 404 });
  }

  // 3. Block if views exhausted (STEP 8)
  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return NextResponse.json({ error: "Paste not found" }, { status: 404 });
  }

  // 4. Block if TTL expired (STEP 9)
  if (paste.expires_at !== null) {
    const now = getNowMs(request);
    if (now >= paste.expires_at) {
      return NextResponse.json({ error: "Paste not found" }, { status: 404 });
    }
  }

  // 5. Increment views
  paste.views += 1;

  // 6. Save back
  await kv.set(`paste:${id}`, paste);

  // 7. Return response
  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.max_views === null
        ? null
        : Math.max(paste.max_views - paste.views, 0),
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null,
  });
}
