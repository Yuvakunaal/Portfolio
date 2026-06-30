"use client";

import { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import {
  TitleSequence,
  TITLE_FPS,
  TITLE_DURATION,
} from "@/components/remotion/TitleSequence";
import { useStore } from "@/lib/store";

export default function Intro() {
  const { introDone, setIntroDone } = useStore();
  const playerRef = useRef<PlayerRef>(null);
  const [leaving, setLeaving] = useState(false);

  // Skip the intro on return visits
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("intro-played")) {
      setIntroDone(true);
    }
  }, [setIntroDone]);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    sessionStorage.setItem("intro-played", "1");
    setTimeout(() => setIntroDone(true), 900);
  };

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    const onEnded = () => finish();
    p.addEventListener("ended", onEnded);

    // Force playback — autoPlay can be suppressed by visibility/autoplay policy.
    const tryPlay = () => {
      try {
        p.play();
      } catch {
        /* ignored — fallback timer still advances the experience */
      }
    };
    const raf = requestAnimationFrame(tryPlay);
    const retry = setTimeout(tryPlay, 350);
    // Resume if the tab regains focus mid-intro
    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    // Hard fallback in case 'ended' doesn't fire
    const fallback = setTimeout(finish, (TITLE_DURATION / TITLE_FPS) * 1000 + 1500);
    return () => {
      p.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      clearTimeout(retry);
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (introDone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#08070a",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.9s var(--ease-cine)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Player
        ref={playerRef}
        component={TitleSequence}
        durationInFrames={TITLE_DURATION}
        fps={TITLE_FPS}
        compositionWidth={1920}
        compositionHeight={1080}
        autoPlay
        loop={false}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />

      <button
        onClick={finish}
        className="cursor-target"
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          zIndex: 210,
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: "var(--muted)",
          background: "transparent",
          border: "1px solid var(--line)",
          borderRadius: "999px",
          padding: "0.5rem 1.1rem",
          textTransform: "uppercase",
          transition: "color 0.4s var(--ease-cine), border-color 0.4s var(--ease-cine)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--bone)";
          e.currentTarget.style.borderColor = "var(--line-strong)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--muted)";
          e.currentTarget.style.borderColor = "var(--line)";
        }}
      >
        Skip Intro →
      </button>
    </div>
  );
}
