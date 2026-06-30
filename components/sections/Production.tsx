"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productionLog } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Production() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Desktop only: pin the section and scrub the track horizontally.
      // ease:"none" is required for 1:1 scroll mapping (per GSAP guidance).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="production"
      ref={sectionRef}
      style={{ overflow: "hidden", background: "var(--black)" }}
    >
      <div
        ref={trackRef}
        className="prod-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(2rem, 5vw, 5rem)",
          padding: "clamp(4rem, 10vh, 8rem) clamp(1.25rem, 6vw, 6rem)",
          minHeight: "100vh",
          width: "max-content",
        }}
      >
        {/* Intro panel */}
        <div className="prod-intro" style={{ flexShrink: 0, maxWidth: "min(80vw, 460px)" }}>
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            004 — Production History
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              color: "var(--bone)",
              lineHeight: 0.95,
            }}
          >
            The Shooting Schedule
          </h2>
          <p
            style={{
              marginTop: "1.75rem",
              color: "var(--muted)",
              fontSize: "0.95rem",
              maxWidth: "34ch",
              lineHeight: 1.6,
            }}
          >
            From the opening frame to the feature — school, CBIT, and the work that followed.
            <span className="mono prod-scroll-cue" style={{ display: "block", marginTop: "1rem", letterSpacing: "0.18em", fontSize: "11px" }}>
              SCROLL TO ADVANCE →
            </span>
          </p>
        </div>

        {/* Timeline entries */}
        {productionLog.map((entry, i) => (
          <div
            key={i}
            className={`prod-entry ${i === productionLog.length - 1 ? "prod-entry-last" : ""}`}
            style={{
              flexShrink: 0,
              width: "min(78vw, 340px)",
              position: "relative",
              paddingTop: "3.5rem",
            }}
          >
            {/* connector line + node */}
            <div
              className="prod-line"
              style={{
                position: "absolute",
                top: "calc(3.5rem - 5px)",
                left: 0,
                right: "-5rem",
                height: 1,
                background: "var(--line)",
              }}
            />
            <div
              className="prod-node"
              style={{
                position: "absolute",
                top: "calc(3.5rem - 10px)",
                left: 0,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: i === productionLog.length - 1 ? "var(--gold)" : "var(--surface-2)",
                border: `1.5px solid ${i === productionLog.length - 1 ? "var(--gold)" : "var(--line-strong)"}`,
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: "12px",
                letterSpacing: "0.16em",
                color: "var(--gold)",
                marginBottom: "0.9rem",
              }}
            >
              {entry.year}
            </div>
            <div
              className="display"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                color: "var(--bone)",
                marginBottom: "0.9rem",
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              {entry.title}
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--bone-dim)",
                fontWeight: 300,
              }}
            >
              {entry.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
