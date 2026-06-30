"use client";

import { Fragment, useState } from "react";
import Stage from "@/components/ui/Stage";
import { KineticHeading } from "@/components/ui/Kinetic";
import { films, type Film } from "@/lib/data";

const ratingColor = (rating: string) => {
  if (rating === "DEPLOYED · PRE-LAUNCH") return "var(--gold)";
  if (rating === "IN THEATERS") return "#7fd1a3";
  if (rating === "AWARD WINNER") return "var(--red)";
  if (rating === "OFFICIAL SELECTION") return "var(--gold)";
  if (rating === "COMPLETE") return "var(--bone-dim)";
  return "var(--muted)";
};

function DetailPanel({ film }: { film: Film }) {
  const color = ratingColor(film.rating);
  const url = film.live || film.github;
  return (
    <div
      className="film-detail-shell"
      style={{
        padding: "0.5rem",
        background: "rgba(239,233,221,0.03)",
        border: "1px solid var(--line)",
        borderRadius: "1.75rem",
        width: "100%",
      }}
    >
      <div
        className="film-detail-core"
        style={{
          position: "relative",
          padding: "clamp(1.75rem, 2.5vw, 2.5rem)",
          background: "var(--surface)",
          borderRadius: "1.4rem",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
          overflow: "hidden",
          minHeight: "360px",
        }}
      >
        {/* Big ghost number watermark */}
        <span
          aria-hidden
          className="display"
          style={{
            position: "absolute",
            top: "-1.5rem",
            right: "-0.5rem",
            fontSize: "10rem",
            lineHeight: 1,
            color: "rgba(239,233,221,0.04)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {film.no}
        </span>

        {/* content keyed so it re-animates on change */}
        <div key={film.no} className="panel-content" style={{ position: "relative" }}>
          <div
            className="film-detail-meta"
            style={{
              display: "grid",
              gridTemplateColumns: "max-content minmax(0, 1fr)",
              alignItems: "start",
              gap: "0.9rem 1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                color,
                border: `1px solid ${color}`,
                borderRadius: "999px",
                padding: "0.3rem 0.7rem",
              }}
            >
              {film.rating}
            </span>
            <span
              className="mono"
              style={{
                fontSize: "11px",
                color: "var(--muted)",
                letterSpacing: "0.14em",
                lineHeight: 1.5,
                textAlign: "right",
                textTransform: "uppercase",
                overflowWrap: "anywhere",
              }}
            >
              {film.genre} · {film.runtime} · {film.year}
            </span>
          </div>

          <h3
            className="display"
            style={{
              fontSize: "clamp(1.8rem, 2.6vw, 2.6rem)",
              color: "var(--bone)",
              marginBottom: "1.25rem",
              fontWeight: 400,
              lineHeight: 1.04,
            }}
          >
            {film.title}
          </h3>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1.08rem)",
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              fontWeight: 300,
              marginBottom: "1.75rem",
            }}
          >
            {film.synopsis}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: url ? "1.75rem" : 0 }}>
            {film.stack.map((s) => (
              <span
                key={s}
                className="mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: "var(--bone-dim)",
                  border: "1px solid var(--line)",
                  borderRadius: "999px",
                  padding: "0.3rem 0.65rem",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {url && (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {film.live && (
                <a
                  href={film.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target"
                  style={ctaSolid}
                >
                  Watch Live
                  <span style={iconCircle("rgba(8,7,10,0.16)")}>↗</span>
                </a>
              )}
              {film.github && (
                <a
                  href={film.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target"
                  style={ctaOutline}
                >
                  Source
                  <span style={iconCircle("rgba(239,233,221,0.08)")}>↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Filmography() {
  const [active, setActive] = useState<Film>(films[0]);
  const [pinnedNo, setPinnedNo] = useState<string | null>(null);

  const pinFilm = (film: Film) => {
    setActive(film);
    setPinnedNo(film.no);
  };

  return (
    <Stage
      id="filmography"
      style={{
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.25rem, 6vw, 6rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "clamp(3rem, 7vh, 5rem)",
        }}
      >
        <div>
          <div className="eyebrow rev" style={{ marginBottom: "1.5rem" }}>
            002 — Selected Filmography
          </div>
          <KineticHeading
            text="The Features"
            className="display"
            style={{ fontSize: "clamp(2.6rem, 8vw, 7rem)", color: "var(--bone)" }}
          />
        </div>
        <span
          className="mono rev"
          style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--muted)" }}
        >
          SELECTED WORKS · LIVE / OPEN SOURCE / COMPLETE
        </span>
      </div>

      {/* List (left) + sticky detail panel (right) */}
      <div className="films-grid">
        {/* LIST — hover previews; click pins so the desktop panel stays readable while scrolling */}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {films.map((film) => {
            const isActive = active.no === film.no;
            const isPinned = pinnedNo === film.no;
            return (
              <Fragment key={film.no}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={isPinned}
                  className="film-row cursor-target rev"
                  onMouseEnter={() => {
                    if (!pinnedNo) setActive(film);
                  }}
                  onClick={() => pinFilm(film)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pinFilm(film);
                    }
                  }}
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: "clamp(1.1rem, 2.2vw, 1.8rem) 0",
                    display: "grid",
                    gridTemplateColumns: "auto minmax(0, 1fr) auto",
                    gap: "1.25rem",
                    alignItems: "baseline",
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.4,
                    outline: "none",
                    transition:
                      "opacity 0.45s var(--ease-cine), border-color 0.45s var(--ease-cine)",
                    borderColor: isPinned ? "var(--line-strong)" : "var(--line)",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.75rem",
                      color: isActive ? "var(--gold)" : "var(--muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {film.no}
                  </span>
                  <span
                    className="film-title display"
                    style={{
                      fontSize: "clamp(1.5rem, 3.6vw, 3rem)",
                      color: isActive ? "var(--gold)" : "var(--bone)",
                      lineHeight: 1,
                      transform: isActive ? "translateX(0.75rem)" : "translateX(0)",
                      transition:
                        "transform 0.5s var(--ease-cine), color 0.4s var(--ease-cine)",
                    }}
                  >
                    {film.title}
                  </span>
                  <span
                    className="mono film-meta"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      color: isPinned ? "var(--gold)" : "var(--muted)",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      alignSelf: "center",
                      transition: "color 0.4s var(--ease-cine)",
                    }}
                  >
                    {film.year}
                  </span>
                </div>

                {isActive && (
                  <div className="mobile-film-detail">
                    <DetailPanel film={film} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* DETAIL PANEL */}
        <div className="films-panel" aria-live="polite">
          <div className="films-panel-reveal">
            <DetailPanel film={active} />
          </div>
        </div>
      </div>

      {/* Crawler-readable full project descriptions (visually hidden — the
          interactive panel only renders the active project). */}
      <ul className="sr-only" aria-label="All projects with descriptions">
        {films.map((film) => (
          <li key={film.no}>
            <h3>
              {film.title} — {film.genre} ({film.year})
            </h3>
            <p>{film.synopsis}</p>
            <p>Tech: {film.stack.join(", ")}.</p>
            {(film.live || film.github) && (
              <a href={film.live || film.github || undefined}>
                {film.title} {film.live ? "live demo" : "source code"}
              </a>
            )}
          </li>
        ))}
      </ul>
    </Stage>
  );
}

const ctaSolid: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.6rem",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--black)",
  background: "var(--gold)",
  borderRadius: "999px",
  padding: "0.55rem 0.6rem 0.55rem 1.1rem",
  textDecoration: "none",
};

const ctaOutline: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.6rem",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--bone)",
  background: "transparent",
  border: "1px solid var(--line-strong)",
  borderRadius: "999px",
  padding: "0.55rem 0.6rem 0.55rem 1.1rem",
  textDecoration: "none",
};

const iconCircle = (bg: string): React.CSSProperties => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
});
