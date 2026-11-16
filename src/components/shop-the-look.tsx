"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BagIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import type { Product } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

export type Look = {
  id: string;
  title: string;
  caption: string;
  image: string;
  hotspots: { x: number; y: number }[];
  products: Product[];
};

export function ShopTheLook({ looks }: { looks: Look[] }) {
  const { addToCart, notify } = useStore();
  const [activeItems, setActiveItems] = useState<Record<string, string>>({});

  const addLook = (look: Look) => {
    look.products.forEach((product) => addToCart(product, { silent: true }));
    const total = look.products.reduce((sum, product) => sum + product.price, 0);
    notify("Look added to bag", `${look.products.length} pieces · ${formatNaira(total)}`);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {looks.map((look, index) => {
        const total = look.products.reduce((sum, product) => sum + product.price, 0);
        const activeProduct = look.products.find(
          (product) => product.slug === activeItems[look.id],
        );

        return (
          <article
            key={look.id}
            className="grid overflow-hidden rounded-2xl border border-ink/12 bg-lime sm:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="relative aspect-4/5 sm:aspect-auto sm:min-h-[480px]">
              <Image
                src={look.image}
                alt={`${look.title} — ELEVN ${index === 0 ? "menswear" : "womenswear"} look`}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 24vw"
                className="object-cover"
              />
              {look.products.map((product) => (
                <Image
                  key={product.slug}
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 24vw"
                  className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeProduct?.slug === product.slug ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span className="absolute top-3 left-3 rounded-full bg-ink px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-lime uppercase">
                {index === 0 ? "Menswear" : "Womenswear"}
              </span>
              <span className="absolute right-3 bottom-3 rounded-full bg-paper/95 px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] text-ink uppercase shadow-sm">
                {activeProduct ? activeProduct.name : "Hover a + to explore"}
              </span>

              {look.hotspots.map((spot, spotIndex) => {
                const product = look.products[spotIndex];
                if (!product) return null;
                const active = activeProduct?.slug === product.slug;
                return (
                  <button
                    key={`${look.id}-${spotIndex}`}
                    type="button"
                    onMouseEnter={() =>
                      setActiveItems((current) => ({ ...current, [look.id]: product.slug }))
                    }
                    onMouseLeave={() =>
                      setActiveItems((current) => {
                        if (current[look.id] !== product.slug) return current;
                        const next = { ...current };
                        delete next[look.id];
                        return next;
                      })
                    }
                    onFocus={() =>
                      setActiveItems((current) => ({ ...current, [look.id]: product.slug }))
                    }
                    onBlur={() =>
                      setActiveItems((current) => {
                        if (current[look.id] !== product.slug) return current;
                        const next = { ...current };
                        delete next[look.id];
                        return next;
                      })
                    }
                    onClick={() =>
                      setActiveItems((current) => ({
                        ...current,
                        [look.id]: current[look.id] === product.slug ? "" : product.slug,
                      }))
                    }
                    aria-label={`Preview ${product.name}`}
                    aria-pressed={active}
                    title={`Preview ${product.name} · ${formatNaira(product.price)}`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center touch-manipulation"
                  >
                    <span className={`flex size-7 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition duration-500 ease-out group-hover:scale-125 group-hover:bg-ink group-focus-visible:bg-ink ${active ? "scale-125 bg-ink" : "animate-pulse-dot bg-pink"}`}>
                      <PlusIcon size={12} />
                    </span>
                    <span className="pointer-events-none ml-2 hidden max-w-[150px] translate-x-1 truncate rounded-full bg-ink px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] text-lime uppercase opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                      {product.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col p-5 md:p-6">
              <p className="eyebrow text-ink/50">{look.caption}</p>
              <h3 className="display mt-2 text-2xl md:text-3xl">{look.title}</h3>

              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {look.products.map((product) => {
                  const active = activeProduct?.slug === product.slug;
                  return (
                    <li
                      key={product.slug}
                      onMouseEnter={() =>
                        setActiveItems((current) => ({ ...current, [look.id]: product.slug }))
                      }
                      onMouseLeave={() =>
                        setActiveItems((current) => {
                          if (current[look.id] !== product.slug) return current;
                          const next = { ...current };
                          delete next[look.id];
                          return next;
                        })
                      }
                      className={`flex items-center gap-3 py-3 transition-colors ${active ? "bg-white/65 px-2" : ""}`}
                    >
                      <Link
                        href={`/shop/${product.slug}`}
                        className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-mist"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/shop/${product.slug}`}
                          className={`block truncate text-[11.5px] font-bold uppercase transition hover:text-pink ${active ? "text-pink" : ""}`}
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 text-[11px] text-ink/55">{formatNaira(product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to bag`}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/20 transition hover:border-pink hover:bg-pink hover:text-white"
                      >
                        <PlusIcon size={13} />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/55">Full look · {look.products.length} pieces</span>
                  <span className="font-bold">{formatNaira(total)}</span>
                </div>
                <button type="button" onClick={() => addLook(look)} className="btn btn-ink mt-3 w-full">
                  <BagIcon size={15} /> Add the look to bag
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
