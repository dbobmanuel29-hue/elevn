"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/catalog";

export function ProductCarousel({ products, label }: { products: Product[]; label: string }) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const [state, setState] = useState({ atStart: true, atEnd: false, progress: 0 });

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = {
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
    };
    setState((current) => {
      if (
        current.atStart === next.atStart &&
        current.atEnd === next.atEnd &&
        Math.abs(current.progress - next.progress) < 0.005
      ) {
        return current;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const scheduleUpdate = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        update();
      });
    };

    update();
    el.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      el.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [update]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scroller}
        role="region"
        aria-label={label}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:-mx-10 md:gap-4 md:px-10 xl:-mx-14 xl:px-14"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[calc((100%-3rem)/4)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-6">
        <div className="relative h-px flex-1 overflow-hidden bg-ink/15">
          <span
            className="absolute inset-y-0 left-0 w-1/4 bg-pink transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${state.progress * 300}%)` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={state.atStart}
            aria-label="Scroll to previous products"
            className="flex size-11 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-lime disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ArrowLeftIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={state.atEnd}
            aria-label="Scroll to next products"
            className="flex size-11 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-lime disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
