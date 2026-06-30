"use client";

import Stage from "@/components/ui/Stage";
import { KineticHeading } from "@/components/ui/Kinetic";
import { departments } from "@/lib/data";

export default function Craft() {
  return (
    <Stage
      id="craft"
      style={{
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.25rem, 6vw, 6rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div className="eyebrow rev" style={{ marginBottom: "1.5rem" }}>
        003 — Below The Line
      </div>
      <KineticHeading
        text="The Craft"
        className="display"
        style={{
          fontSize: "clamp(2.6rem, 8vw, 7rem)",
          color: "var(--bone)",
          marginBottom: "clamp(3rem, 7vh, 5rem)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
        className="craft-grid"
      >
        {departments.map((d) => (
          <div
            key={d.dept}
            className="rev cursor-target"
            style={{
              padding: "0.5rem",
              background: "rgba(239,233,221,0.03)",
              border: "1px solid var(--line)",
              borderRadius: "1.75rem",
              transition: "border-color 0.5s var(--ease-cine)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--line-strong)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--line)")
            }
          >
            <div
              style={{
                padding: "clamp(1.5rem, 2.5vw, 2.25rem)",
                background: "var(--surface)",
                borderRadius: "1.4rem",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                height: "100%",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  color: "var(--gold)",
                  marginBottom: "0.6rem",
                }}
              >
                {d.dept}
              </div>
              <div
                className="display"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--bone)",
                  marginBottom: "1.5rem",
                  fontWeight: 400,
                }}
              >
                {d.role}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {d.skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--bone-dim)",
                      border: "1px solid var(--line)",
                      borderRadius: "999px",
                      padding: "0.3rem 0.75rem",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}
