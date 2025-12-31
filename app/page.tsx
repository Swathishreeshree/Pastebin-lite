export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f19",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Pastebin Lite</h1>

      <p style={{ color: "#9ca3af", fontSize: "1rem" }}>
        A lightweight paste service
      </p>
    </main>
  );
}
