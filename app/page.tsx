"use client";

import { useStore } from "@/lib/store";
import LenisProvider from "@/components/ui/LenisProvider";
import Nav from "@/components/ui/Nav";
import Ticker from "@/components/ui/Ticker";
import Intro from "@/components/sections/Intro";
import Marquee from "@/components/sections/Marquee";
import Logline from "@/components/sections/Logline";
import Filmography from "@/components/sections/Filmography";
import Craft from "@/components/sections/Craft";
import Production from "@/components/sections/Production";
import Laurels from "@/components/sections/Laurels";
import EndCredits from "@/components/sections/EndCredits";

export default function Home() {
  const introDone = useStore((s) => s.introDone);

  return (
    <>
      <Intro />
      <Ticker />
      <Nav />
      <LenisProvider>
        <main
          style={{
            opacity: introDone ? 1 : 0,
            transition: "opacity 0.9s var(--ease-cine)",
          }}
        >
          <Marquee />
          <Logline />
          <Filmography />
          <Craft />
          <Production />
          <Laurels />
          <EndCredits />
        </main>
      </LenisProvider>
    </>
  );
}
