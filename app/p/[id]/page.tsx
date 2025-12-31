import kv from "@/lib/kv";

type Paste = {
  id: string;
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
};

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ STEP 2 FIX: await params
  const { id } = await params;

  // 1. Read paste from KV
  const paste = await kv.get<Paste>(`paste:${id}`);
  const now = Date.now();

  // 🔒 Block if max views exhausted
  if (paste && paste.max_views !== null && paste.views >= paste.max_views) {
    return (
      <main style={{ padding: "20px", color: "white" }}>
        <h1>404 – Paste not found</h1>
      </main>
    );
  }

  // 2. Paste not found
  if (!paste) {
    return (
      <main style={{ padding: "20px", color: "white" }}>
        <h1>404 – Paste not found</h1>
      </main>
    );
  }

  // 3. Paste expired (TTL check)
  if (paste.expires_at !== null && now >= paste.expires_at) {
    return (
      <main style={{ padding: "20px", color: "white" }}>
        <h1>Paste expired</h1>
        <p>This paste is no longer available.</p>
      </main>
    );
  }
  // 4. Increment views
  await kv.set(`paste:${id}`, {
    ...paste,
    views: paste.views + 1,
  });

  // 4. Render paste
  return (
    <main style={{ padding: "20px", color: "white" }}>
      <h1>Paste</h1>

      <pre>{paste.content}</pre>

      <hr />

      <p>
        <strong>Remaining views:</strong>{" "}
        {paste.max_views === null
          ? "Unlimited"
          : Math.max(paste.max_views - paste.views, 0)}
      </p>

      <p>
        <strong>Expires at:</strong>{" "}
        {paste.expires_at
          ? new Date(paste.expires_at).toLocaleString()
          : "Never"}
      </p>
    </main>
  );
}
