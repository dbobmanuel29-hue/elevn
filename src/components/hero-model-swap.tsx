"use client";

import { useState } from "react";
import Image from "next/image";

export function HeroModelSwap() {
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div
      className="relative isolate h-[470px] w-full max-w-[560px] overflow-hidden sm:h-[590px] lg:h-[680px]"
      onMouseEnter={() => setShowSecond(true)}
      onMouseLeave={() => setShowSecond(false)}
      onFocus={() => setShowSecond(true)}
      onBlur={() => setShowSecond(false)}
      onClick={() => setShowSecond((current) => !current)}
      role="button"
      tabIndex={0}
      aria-label="Preview the second ELEVN campaign model"
      aria-pressed={showSecond}
    >
      <Image
        src="/images/elevn-hero-men.webp"
        alt="Menswear model wearing a cream jacket and white outfit"
        fill
        priority
        sizes="(max-width: 1024px) 82vw, 38vw"
        className={`object-contain object-bottom transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${showSecond ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src="/images/elevn-hero-women.webp"
        alt="Womenswear model wearing a red varsity jacket and relaxed denim"
        fill
        priority
        sizes="(max-width: 1024px) 82vw, 38vw"
        className={`object-contain object-bottom transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${showSecond ? "opacity-100" : "opacity-0"}`}
      />
      <span className="sr-only" aria-live="polite">{showSecond ? "Womenswear look" : "Menswear look"}</span>
    </div>
  );
}
