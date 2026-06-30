"use client";

import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { films, director } from "@/lib/data";

const CINE = Easing.bezier(0.16, 1, 0.3, 1);

/* Cinematic letterbox bars baked into the composition */
const Letterbox = () => (
  <>
    <AbsoluteFill style={{ justifyContent: "flex-start" }}>
      <div style={{ height: "8%", background: "#000" }} />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: "8%", background: "#000" }} />
    </AbsoluteFill>
  </>
);

const Vignette = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
    }}
  />
);

/* A thin gold projector line that draws across, then a small presents line */
const StudioCard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineW = interpolate(frame, [0, 0.8 * fps], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CINE,
  });
  const textO = interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [1.7 * fps, 2 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 22,
        opacity: out,
      }}
    >
      <div
        style={{
          height: 1,
          width: lineW,
          background: "#e0a92e",
        }}
      />
      <div
        style={{
          opacity: textO,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 15,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "#b8b0a1",
          paddingLeft: "0.5em",
        }}
      >
        An Independent Production
      </div>
    </AbsoluteFill>
  );
};

/* The main title card — giant serif name mask-revealing up */
const TitleCard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const y = interpolate(frame, [0, 1 * fps], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CINE,
  });
  const o = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 3 * fps], [1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CINE,
  });
  const subO = interpolate(frame, [0.9 * fps, 1.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [2.4 * fps, 2.8 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: out,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 14,
          letterSpacing: "0.45em",
          color: "#e0a92e",
          marginBottom: 26,
          opacity: subO,
          paddingLeft: "0.45em",
        }}
      >
        A FILM BY
      </div>
      <div style={{ overflow: "hidden", padding: "0 12px" }}>
        <div
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 300,
            fontSize: 184,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#efe9dd",
            translate: `0px ${y}px`,
            scale,
            opacity: o,
          }}
        >
          {director.name}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 15,
          letterSpacing: "0.32em",
          color: "#b8b0a1",
          marginTop: 30,
          opacity: subO,
          textTransform: "uppercase",
        }}
      >
        AI Engineer · Systems Builder · Founder
      </div>
    </AbsoluteFill>
  );
};

/* Cast list — project names flashing like opening credits */
const CastRoll = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerO = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(frame, [2.3 * fps, 2.7 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const featured = films.slice(0, 5);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 14,
        opacity: out,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 13,
          letterSpacing: "0.45em",
          color: "#8c857a",
          marginBottom: 18,
          opacity: headerO,
        }}
      >
        FEATURING
      </div>
      {featured.map((f, i) => {
        const start = 0.3 * fps + i * 0.18 * fps;
        const o = interpolate(frame, [start, start + 0.3 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const yy = interpolate(frame, [start, start + 0.4 * fps], [18, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CINE,
        });
        return (
          <div
            key={f.no}
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 300,
              fontSize: 46,
              letterSpacing: "-0.02em",
              color: "#efe9dd",
              opacity: o,
              translate: `0px ${yy}px`,
            }}
          >
            {f.title}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* Final "now showing" beat */
const NowShowing = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const o = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineW = interpolate(frame, [0.2 * fps, 1.1 * fps], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CINE,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        opacity: o,
      }}
    >
      <div style={{ height: 1, width: lineW, background: "#e0a92e" }} />
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 18,
          letterSpacing: "0.5em",
          color: "#efe9dd",
          textTransform: "uppercase",
          paddingLeft: "0.5em",
        }}
      >
        Now Showing
      </div>
    </AbsoluteFill>
  );
};

export const TITLE_FPS = 30;
export const TITLE_DURATION = 9 * TITLE_FPS; // 9 seconds

export const TitleSequence = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#08070a" }}>
      <Sequence durationInFrames={2 * fps} layout="none">
        <StudioCard />
      </Sequence>
      <Sequence from={2 * fps} durationInFrames={3 * fps} layout="none">
        <TitleCard />
      </Sequence>
      <Sequence from={5 * fps} durationInFrames={2.7 * fps} layout="none">
        <CastRoll />
      </Sequence>
      <Sequence from={7.7 * fps} layout="none">
        <NowShowing />
      </Sequence>
      <Vignette />
      <Letterbox />
    </AbsoluteFill>
  );
};
