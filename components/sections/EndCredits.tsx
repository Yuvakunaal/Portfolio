"use client";

import Stage from "@/components/ui/Stage";
import { KineticHeading } from "@/components/ui/Kinetic";
import { director } from "@/lib/data";

const creditRows: [string, string][] = [
  ["Directed By", "Kunaal"],
  ["Written By", "Kunaal"],
  ["Engineered By", "Kunaal"],
  ["Shipped By", "Kunaal"],
  ["Now Casting", "GenAI · Data · Full-Stack Roles"],
];

export default function EndCredits() {
  return (
    <Stage
      id="end-credits"
      style={{
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.25rem, 6vw, 6rem) clamp(4rem, 8vh, 7rem)",
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div className="eyebrow rev" style={{ marginBottom: "1.5rem" }}>
        006 — End Credits
      </div>

      <KineticHeading
        text="Let's make something worth screening."
        className="display"
        style={{
          fontSize: "clamp(2.2rem, 6vw, 5rem)",
          color: "var(--bone)",
          maxWidth: "18ch",
          margin: "0 auto clamp(3rem, 6vh, 4.5rem)",
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
        }}
      />

      {/* Credits crawl */}
      <div
        className="rev"
        style={{
          maxWidth: "440px",
          margin: "0 auto clamp(3rem, 6vh, 4rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {creditRows.map(([role, name]) => (
          <div
            key={role}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textAlign: "right",
              }}
            >
              {role}
            </span>
            <span style={{ color: "var(--line-strong)" }}>·</span>
            <span
              style={{
                fontSize: "0.95rem",
                color: "var(--bone)",
                textAlign: "left",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Primary CTA — button-in-button */}
      <div className="rev" style={{ marginBottom: "2.5rem" }}>
        <a
          href={`mailto:${director.email}`}
          className="cursor-target"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--black)",
            background: "var(--gold)",
            borderRadius: "999px",
            padding: "0.7rem 0.75rem 0.7rem 1.4rem",
            textDecoration: "none",
          }}
        >
          Get In Touch
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "rgba(8,7,10,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
            }}
          >
            ↗
          </span>
        </a>
      </div>

      {/* Socials */}
      <div
        className="rev"
        style={{
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "clamp(4rem, 9vh, 7rem)",
        }}
      >
        {director.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--bone-dim)",
              textDecoration: "none",
              borderBottom: "1px solid var(--line)",
              paddingBottom: "0.25rem",
              transition: "color 0.4s var(--ease-cine), border-color 0.4s var(--ease-cine)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--bone-dim)";
              e.currentTarget.style.borderColor = "var(--line)";
            }}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* FIN */}
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
        <div
          className="display rev"
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "var(--bone)",
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}
        >
          FIN
        </div>
        <div
          className="mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          © {new Date().getFullYear()} {director.fullName} · Independent Production
        </div>
      </div>
    </Stage>
  );
}
