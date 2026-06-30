"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Stage({
  id,
  children,
  className,
  style,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Kinetic masked headings: stagger words up from behind a mask
      gsap.utils.toArray<HTMLElement>("[data-kinetic]").forEach((heading) => {
        const spans = heading.querySelectorAll<HTMLElement>(".mask > span");
        const masks = heading.querySelectorAll<HTMLElement>(".mask");
        gsap.fromTo(
          spans,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.08,
            // once revealed, stop clipping so nothing can cut a glyph
            onComplete: () =>
              masks.forEach((m) => (m.style.overflow = "visible")),
            scrollTrigger: { trigger: heading, start: "top 92%", once: true },
          }
        );
      });

      // Generic fade-up reveals with a soft blur dissolve
      gsap.utils.toArray<HTMLElement>(".rev").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // Recalculate after layout/fonts settle (pinned sections shift positions)
      const r1 = gsap.delayedCall(0.5, () => ScrollTrigger.refresh());

      // Failsafe: any heading already in view whose reveal never fired gets shown
      const r2 = gsap.delayedCall(2.6, () => {
        gsap.utils.toArray<HTMLElement>("[data-kinetic]").forEach((heading) => {
          const rect = heading.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const spans = heading.querySelectorAll<HTMLElement>(".mask > span");
            spans.forEach((s) => {
              if (Math.abs(gsap.getProperty(s, "yPercent") as number) > 1) {
                gsap.to(s, { yPercent: 0, duration: 0.6, ease: "expo.out" });
              }
            });
            heading
              .querySelectorAll<HTMLElement>(".mask")
              .forEach((m) => (m.style.overflow = "visible"));
          }
        });
      });

      return () => {
        r1.kill();
        r2.kill();
      };
    },
    { scope: ref }
  );

  return (
    <section id={id} ref={ref} className={className} style={style}>
      {children}
    </section>
  );
}
