"use client";

import Stage from "@/components/ui/Stage";
import { KineticHeading } from "@/components/ui/Kinetic";
import { director } from "@/lib/data";

export default function Logline() {
  return (
    <Stage
      id="logline"
      style={{
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.25rem, 6vw, 6rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div className="eyebrow rev" style={{ marginBottom: "2.5rem" }}>
        001 — The Director
      </div>

      <KineticHeading
        text="Systems that think. Products that ship."
        className="display"
        style={{
          fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
          maxWidth: "16ch",
          color: "var(--bone)",
          marginBottom: "clamp(3rem, 7vh, 5rem)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.8fr)",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "start",
        }}
        className="logline-grid"
      >
        <p
          className="rev"
          style={{
            fontSize: "clamp(1.05rem, 1.6vw, 1.45rem)",
            lineHeight: 1.7,
            color: "var(--bone-dim)",
            fontWeight: 300,
            maxWidth: "44ch",
          }}
        >
          {director.fullName} is an{" "}
          <span style={{ color: "var(--bone)" }}>
            AI &amp; Data Science engineer
          </span>{" "}
          who doesn&apos;t prototype and move on — he designs, builds, ships, and
          owns end-to-end systems. From multi-agent AI pipelines to
          production-grade SaaS with real users, the work spans the whole reel:{" "}
          <span style={{ color: "var(--gold)" }}>idea → architecture → launch.</span>
        </p>

        <div
          className="rev"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            paddingTop: "0.4rem",
          }}
        >
          {[
            ["ROLE", "AI Engineer · Founder"],
            ["MODE", "Independent · Self-directed"],
            ["BASE", "Hyderabad, India · UTC+5:30"],
            ["STATUS", "Open to opportunities"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "var(--muted)",
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontSize: "0.92rem",
                  color: "var(--bone)",
                  textAlign: "right",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
