"use client";

import Stage from "@/components/ui/Stage";
import { KineticHeading } from "@/components/ui/Kinetic";
import { laurels } from "@/lib/data";

/* A simple laurel-wreath frame around each honor, drawn with CSS */
function Laurel({ honor, body }: { honor: string; body: string }) {
  return (
    <div
      className="rev cursor-target"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem 1rem",
        position: "relative",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "0.5rem",
          top: "50%",
          transform: "translateY(-50%) scaleX(-1)",
          fontSize: "3.5rem",
          color: "var(--line-strong)",
          lineHeight: 1,
        }}
      >
        ❨
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "0.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "3.5rem",
          color: "var(--line-strong)",
          lineHeight: 1,
        }}
      >
        ❩
      </span>
      <span
        className="display"
        style={{
          fontSize: "clamp(1.4rem, 3vw, 2.1rem)",
          color: "var(--gold)",
          marginBottom: "0.5rem",
          fontWeight: 400,
        }}
      >
        {honor}
      </span>
      <span
        className="mono"
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--bone-dim)",
          textTransform: "uppercase",
          maxWidth: "20ch",
          lineHeight: 1.5,
        }}
      >
        {body}
      </span>
    </div>
  );
}

export default function Laurels() {
  return (
    <Stage
      id="laurels"
      style={{
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.25rem, 6vw, 6rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(3rem, 7vh, 5rem)",
        }}
      >
        <div className="eyebrow rev" style={{ marginBottom: "1.5rem" }}>
          005 — Official Selection
        </div>
        <KineticHeading
          text="Laurels &amp; Honors"
          className="display"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 7rem)",
            color: "var(--bone)",
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {laurels.map((l, i) => (
          <Laurel key={i} honor={l.honor} body={l.body} />
        ))}
      </div>
    </Stage>
  );
}
