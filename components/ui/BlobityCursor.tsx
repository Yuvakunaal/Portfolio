"use client";

import { useEffect } from "react";

export default function BlobityCursor() {
  useEffect(() => {
    // Only on devices with a precise pointer (skip touch)
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let blobity: { destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      try {
        const { default: Blobity } = await import("blobity");
        if (cancelled) return;
        blobity = new Blobity({
          licenseKey: "opensource",
          // translucent gold highlight: keeps the "orange elaboration" the user
          // likes while letting the label read straight through it
          color: "#e0a92e",
          dotColor: "#e0a92e",
          invert: false,
          opacity: 0.32,
          focusableElementsOffsetX: 10,
          focusableElementsOffsetY: 10,
          radius: 10,
          zIndex: 52,
          size: 14,
          magnetic: true,
          mode: "normal",
          focusableElements:
            "[data-blobity], a, button, .cursor-target",
        }) as unknown as { destroy: () => void };
      } catch {
        // Blobity failed to load — silently fall back to the native cursor.
      }
    })();

    return () => {
      cancelled = true;
      blobity?.destroy();
    };
  }, []);

  return null;
}
