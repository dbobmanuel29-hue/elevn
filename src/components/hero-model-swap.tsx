"use client";

import { useState } from "react";
import Image from "next/image";

export function HeroModelSwap() {
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div
      className="relative isolate h-[470px] w-full max-w-[560px] overflow-hidden bg-transparent sm:h-[590px] lg:h-[680px]"
      onMouseEnter={() => setShowSecond(true)}
      onMouseLeave={() => setShowSecond(false)}
      onFocus={() => setShowSecond(true)}
      onBlur={() => setShowSecond(false)}
      onClick={() => setShowSecond((current) => !current)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setShowSecond((current) => !current);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Hover or tap to switch between the ELEVN menswear and womenswear models"
      aria-pressed={showSecond}
    >
      <Image
        src="/images/elevn-hero-men.png"
        alt="ELEVN menswear model wearing a cream jacket and white outfit"
        fill
        priority
        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 560px"
        className={`object-contain object-bottom transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${showSecond ? "scale-[0.985] opacity-0" : "scale-100 opacity-100"}`}
      />
      <Image
        src="/images/elevn-hero-women.png"
        alt="ELEVN womenswear model wearing a red varsity jacket and relaxed denim"
        fill
        priority
        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 560px"
        className={`object-contain object-bottom transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${showSecond ? "scale-100 opacity-100" : "scale-[0.985] opacity-0"}`}
      />
      <span className="sr-only" aria-live="polite">
        {showSecond ? "Womenswear look" : "Menswear look"}
      </span>
    </div>
  );
}
