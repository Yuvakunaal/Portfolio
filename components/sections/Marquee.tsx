"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/lib/store";
import { director } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const introDone = useStore((s) => s.introDone);
  const show = introDone;

  // gsap only drives the scroll parallax of the title (no entrance — that's CSS).
  useGSAP(
    () => {
      gsap.to(".hero-title", {
        yPercent: -38,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  const scrollDown = () =>
    document.getElementById("logline")?.scrollIntoView({ behavior: "smooth" });

  // staggered delay helper for the CSS reveal
  const fade = (i: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(22px)",
    filter: show ? "blur(0)" : "blur(6px)",
    transition: `opacity 1s var(--ease-cine) ${0.5 + i * 0.12}s, transform 1s var(--ease-cine) ${0.5 + i * 0.12}s, filter 1s var(--ease-cine) ${0.5 + i * 0.12}s`,
  });

  return (
    <section
      id="marquee"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem clamp(1.25rem, 6vw, 6rem) 4rem",
        overflow: "hidden",
      }}
    >
      {/* eyebrow */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "12px",
          letterSpacing: "0.45em",
          color: "var(--gold)",
          textTransform: "uppercase",
          marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
          paddingLeft: "0.45em",
          ...fade(0),
        }}
      >
        A Film By
      </div>

      {/* giant title — CSS mask reveal */}
      <h1
        className="hero-title display"
        style={{
          fontSize: "clamp(4rem, 19vw, 19rem)",
          color: "var(--bone)",
          lineHeight: 0.85,
          letterSpacing: "-0.03em",
          textAlign: "center",
          margin: 0,
        }}
      >
        <span
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: show ? "translateY(0)" : "translateY(118%)",
              transition: "transform 1.3s var(--ease-cine) 0.1s",
            }}
          >
            {director.name}
          </span>
        </span>
        {/* Descriptive, crawler-readable H1 text (visually hidden) */}
        <span className="sr-only">
          {`${director.fullName} — AI Engineer, Multi-Agent Systems Builder & SaaS Founder`}
        </span>
      </h1>

      {/* tagline */}
      <div
        className="mono"
        style={{
          fontSize: "clamp(0.7rem, 1.6vw, 1rem)",
          letterSpacing: "0.3em",
          color: "var(--bone-dim)",
          textTransform: "uppercase",
          marginTop: "clamp(1.5rem, 4vh, 2.5rem)",
          textAlign: "center",
          ...fade(1),
        }}
      >
        Engineer · Systems Builder · Founder
      </div>

      {/* logline */}
      <p
        style={{
          maxWidth: "42ch",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
          lineHeight: 1.6,
          marginTop: "1.75rem",
          fontWeight: 300,
          ...fade(2),
        }}
      >
        {director.logline}
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "clamp(2rem, 5vh, 3rem)",
          flexWrap: "wrap",
          justifyContent: "center",
          ...fade(3),
        }}
      >
        <button onClick={scrollDown} className="cursor-target magnetic" style={ctaPrimary}>
          Roll Feature ↓
        </button>
        <button
          onClick={() =>
            document.getElementById("filmography")?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-target magnetic"
          style={ctaGhost}
        >
          Filmography
        </button>
      </div>

      {/* scroll cue */}
      <div
        className="mono"
        style={{
          position: "absolute",
          bottom: "1.75rem",
          fontSize: "10px",
          letterSpacing: "0.25em",
          color: "var(--muted)",
          textTransform: "uppercase",
          opacity: show ? 1 : 0,
          transition: "opacity 1s var(--ease-cine) 1.4s",
        }}
      >
        Scroll — the feature begins
      </div>
    </section>
  );
}

const ctaPrimary: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--black)",
  background: "var(--bone)",
  border: "none",
  borderRadius: "999px",
  padding: "0.8rem 1.6rem",
};

const ctaGhost: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--bone)",
  background: "transparent",
  border: "1px solid var(--line-strong)",
  borderRadius: "999px",
  padding: "0.8rem 1.6rem",
};
