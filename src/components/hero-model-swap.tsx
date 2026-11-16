"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/data/catalog";
import { ArrowUpRightIcon } from "@/components/icons";

type HeroModelSwapProps = {
  menProduct: Product | null;
  womenProduct: Product | null;
};

export function HeroModelSwap({ menProduct, womenProduct }: HeroModelSwapProps) {
  const [showSecond, setShowSecond] = useState(false);
  const activeProduct = showSecond ? womenProduct ?? menProduct : menProduct ?? womenProduct;

  return (
    <div
      className="relative isolate h-[470px] w-full max-w-[560px] overflow-visible bg-transparent sm:h-[590px] lg:h-[680px]"
      onMouseEnter={() => setShowSecond(true)}
      onMouseLeave={() => setShowSecond(false)}
      onFocus={() => setShowSecond(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setShowSecond(false);
        }
      }}
      onClick={() => setShowSecond((current) => !current)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
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
        src="/images/ChatGPT%20Image%20Nov%2016,%202026,%2005_06_18%20PM.png"
        alt="ELEVN menswear model wearing a cream jacket and white outfit"
        fill
        priority
        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 560px"
        className={`pointer-events-none object-contain object-bottom bg-transparent transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${showSecond ? "scale-[0.985] opacity-0" : "scale-100 opacity-100"}`}
      />
      <Image
        src="/images/ChatGPT%20Image%20Nov%2016,%202026,%2005_06_31%20PM.png"
        alt="ELEVN womenswear model wearing a red varsity jacket and relaxed denim"
        fill
        priority
        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 560px"
        className={`pointer-events-none object-contain object-bottom bg-transparent transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${showSecond ? "scale-100 opacity-100" : "scale-[0.985] opacity-0"}`}
      />
      {activeProduct ? (
        <Link
          href={`/shop/${activeProduct.slug}`}
          onClick={(event) => event.stopPropagation()}
          className="absolute bottom-3 left-1/2 z-20 flex w-[min(270px,88%)] -translate-x-1/2 items-center gap-3 rounded-full border border-ink/10 bg-paper/95 px-4 py-3 shadow-[0_18px_40px_-24px_rgba(17,17,17,0.7)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-pink focus-visible:border-pink sm:bottom-7"
          aria-label={`Explore ${activeProduct.name}`}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[8px] font-semibold tracking-[0.16em] text-pink uppercase">
              {showSecond ? "Womenswear" : "Menswear"} · Discover the look
            </span>
            <span className="mt-1 block truncate text-[11px] font-bold uppercase text-ink">
              {activeProduct.name}
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.14em] text-ink/55 uppercase">Explore the collection</span>
          </span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-lime transition-colors group-hover:bg-pink">
            <ArrowUpRightIcon size={15} />
          </span>
        </Link>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {showSecond ? "Womenswear look" : "Menswear look"}
      </span>
    </div>
  );
}
