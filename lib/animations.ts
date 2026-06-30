export const easing = {
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  snap: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easing.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const stagger = (delay = 0.05) => ({
  animate: { transition: { staggerChildren: delay } },
});

export const glitchKeyframes = `
  @keyframes glitch {
    0% { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
    10% { clip-path: inset(20% 0 60% 0); transform: translate(2px, 0); }
    20% { clip-path: inset(50% 0 30% 0); transform: translate(-1px, 0); }
    30% { clip-path: inset(70% 0 10% 0); transform: translate(1px, 0); }
    40% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
    100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes arena-flash {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
