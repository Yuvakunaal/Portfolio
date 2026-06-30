"use client";

import LenisProvider from "@/components/ui/LenisProvider";
import Nav from "@/components/ui/Nav";
import Ticker from "@/components/ui/Ticker";
import Marquee from "@/components/sections/Marquee";
import Logline from "@/components/sections/Logline";
import Filmography from "@/components/sections/Filmography";
import Craft from "@/components/sections/Craft";
import Production from "@/components/sections/Production";
import Laurels from "@/components/sections/Laurels";
import EndCredits from "@/components/sections/EndCredits";

export default function Home() {
  return (
    <>
      <Ticker />
      <Nav />
      <LenisProvider>
        <main>
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
