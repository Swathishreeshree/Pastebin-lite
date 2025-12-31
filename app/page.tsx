export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Pastebin Lite</h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        A lightweight Pastebin-style service built with Next.js and KV storage.
      </p>

      <section style={{ marginBottom: "30px" }}>
        <h2>🚀 Features</h2>
        <ul>
          <li>Create text pastes via API</li>
          <li>Optional expiry time</li>
          <li>Optional view limits</li>
          <li>Automatic paste invalidation</li>
        </ul>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>🔌 API Endpoints</h2>

        <pre style={{ background: "#020617", padding: "15px" }}>
          POST /api/pastes
          {`
{
  "content": "Hello world",
  "expires_in": 60,
  "max_views": 5
}
`}
        </pre>

        <pre
          style={{ background: "#020617", padding: "15px", marginTop: "10px" }}
        >
          GET /api/pastes/:id
        </pre>
      </section>

      <section>
        <h2>📄 Paste Viewer</h2>
        <p>Open a paste using:</p>
        <pre style={{ background: "#020617", padding: "15px" }}>
          /p/&lt;paste_id&gt;
        </pre>
      </section>

      <footer style={{ marginTop: "50px", color: "#64748b" }}>
        Built by Swathishree • Take-Home Assignment
      </footer>
    </main>
  );
}
