"use client";

import { director } from "@/lib/data";

const ITEM = `NOW SHOWING — ${director.fullName}   ●   FOUNDER OF SQLUMINA   ●   SELECTED WORKS   ●   AI ENGINEER · PRODUCTION-GRADE SYSTEMS`;

function Group() {
  return (
    <span
      className="mono"
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        fontSize: "10px",
        letterSpacing: "0.28em",
        color: "var(--muted)",
        textTransform: "uppercase",
        paddingRight: "3rem",
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} style={{ marginRight: "3rem" }}>
          ● {ITEM}
        </span>
      ))}
    </span>
  );
}

export default function Ticker() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        zIndex: 66,
        background: "linear-gradient(180deg, rgba(8,7,10,0.96), rgba(8,7,10,0.72))",
        borderBottom: "1px solid var(--line)",
        boxShadow: "0 18px 70px rgba(0,0,0,0.42)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        opacity: 1,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          animation: "marqueeScroll 38s linear infinite",
          willChange: "transform",
        }}
      >
        <Group />
        <Group />
      </div>
    </div>
  );
}
