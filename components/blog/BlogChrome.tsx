import Link from "next/link";

export default function BlogChrome({
  children,
  maxWidth = 760,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "1.2rem",
          left: 0,
          right: 0,
          zIndex: 70,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <nav
          aria-label="Blog"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            width: "min(760px, calc(100vw - 2rem))",
            minHeight: 48,
            padding: "0.5rem 0.6rem 0.5rem 1.15rem",
            borderRadius: "999px",
            background: "rgba(19, 18, 23, 0.72)",
            border: "1px solid var(--line)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          <Link
            href="/"
            aria-label="Kunaal — home"
            className="cursor-target"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--bone)",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "var(--gold)", fontSize: "0.9rem" }}>✦</span>
            <span
              className="mono"
              style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              KUNAAL
            </span>
          </Link>
          <Link
            href="/"
            className="cursor-target mono"
            style={{
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--bone-dim)",
              textDecoration: "none",
            }}
          >
            ← Portfolio
          </Link>
        </nav>
      </header>

      <main
        style={{
          maxWidth,
          margin: "0 auto",
          padding: "8rem clamp(1.25rem, 6vw, 2rem) 6rem",
        }}
      >
        {children}
      </main>
    </>
  );
}
