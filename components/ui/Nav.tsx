"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { director } from "@/lib/data";

const links = [
  { label: "Profile", id: "logline" },
  { label: "Projects", id: "filmography" },
  { label: "Skills", id: "craft" },
  { label: "Journey", id: "production" },
  { label: "Credentials", id: "laurels" },
];

export default function Nav() {
  const introDone = useStore((s) => s.introDone);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ---------- Floating pill nav ---------- */}
      <header
        style={{
          position: "fixed",
          top: "0.65rem",
          left: "50%",
          transform: `translateX(-50%) translateY(${introDone ? "0" : "-160%"})`,
          opacity: introDone ? 1 : 0,
          zIndex: 72,
          transition:
            "transform 0.7s var(--ease-cine), opacity 0.7s var(--ease-cine)",
          width: "min(960px, calc(100vw - 2rem))",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            minHeight: 48,
            padding: "0.48rem 0.6rem 0.48rem 1.15rem",
            borderRadius: "999px",
            background: "rgba(19, 18, 23, 0.72)",
            border: "1px solid var(--line)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Brand */}
          <button
            onClick={() => go("marquee")}
            aria-label="Kunaal — back to top"
            className="cursor-target"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "none",
              color: "var(--bone)",
            }}
          >
            <span style={{ color: "var(--gold)", fontSize: "0.9rem" }}>✦</span>
            <span
              className="mono"
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {director.name}
            </span>
          </button>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: "flex", gap: "0.35rem" }}>
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="cursor-target nav-link"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--bone-dim)",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.45rem 0.7rem",
                  borderRadius: "999px",
                  transition: "color 0.35s var(--ease-cine)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bone)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--bone-dim)")
                }
              >
                {l.label}
              </button>
            ))}
            <Link
              href="/blog"
              className="cursor-target nav-link"
              style={{
                color: "var(--bone-dim)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.45rem 0.7rem",
                borderRadius: "999px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                transition: "color 0.35s var(--ease-cine)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bone)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--bone-dim)")}
            >
              Writing
            </Link>
          </div>

          {/* CTA */}
          <button
            onClick={() => go("end-credits")}
            aria-label="Go to contact section"
            className="cursor-target nav-cta"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--bone)",
              color: "var(--black)",
              border: "none",
              borderRadius: "999px",
              padding: "0.5rem 0.55rem 0.5rem 1rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Contact
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(8,7,10,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
            >
              ↗
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="cursor-target nav-burger"
            aria-label="Menu"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "4px",
              background: "transparent",
              border: "none",
              padding: "0.5rem",
            }}
          >
            <span
              style={{
                width: 20,
                height: 1.5,
                background: "var(--bone)",
                transition: "transform 0.4s var(--ease-cine)",
                transform: menuOpen ? "translateY(5.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                width: 20,
                height: 1.5,
                background: "var(--bone)",
                transition: "transform 0.4s var(--ease-cine)",
                transform: menuOpen ? "translateY(-5.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ---------- Mobile fullscreen menu ---------- */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 69,
          background: "rgba(8,7,10,0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.5s var(--ease-cine)",
        }}
      >
        {[...links, { label: "Contact", id: "end-credits" }].map((l, i) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="display"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--bone)",
              fontSize: "2.4rem",
              fontWeight: 400,
              padding: "0.4rem 1rem",
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.6s var(--ease-cine) ${i * 0.06}s, opacity 0.6s var(--ease-cine) ${i * 0.06}s`,
            }}
          >
            {l.label}
          </button>
        ))}
        <Link
          href="/blog"
          onClick={() => setMenuOpen(false)}
          className="display"
          style={{
            color: "var(--bone)",
            fontSize: "2.4rem",
            fontWeight: 400,
            padding: "0.4rem 1rem",
            textDecoration: "none",
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0,
            transition: `transform 0.6s var(--ease-cine) 0.36s, opacity 0.6s var(--ease-cine) 0.36s`,
          }}
        >
          Writing
        </Link>
      </div>
    </>
  );
}
