"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ArrowUpRightIcon,
  BagIcon,
  CheckIcon,
  CloseIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { categoryLabel, type Product } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

export function QuickViewModal() {
  const { quickView, closeQuickView } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    closeQuickView();
  }, [pathname, closeQuickView]);

  useEffect(() => {
    if (!quickView) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeQuickView();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [quickView, closeQuickView]);

  if (!quickView) return null;

  return <QuickViewPanel key={quickView.slug} product={quickView} onClose={closeQuickView} />;
}

function QuickViewPanel({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [qty, setQty] = useState(1);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const saved = isWishlisted(product.slug);
  const onSale = product.compareAtPrice !== null && product.compareAtPrice > product.price;

  useEffect(() => {
    const timer = setTimeout(() => closeRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-6">
      <div
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-ink/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="animate-fade-up relative grid max-h-[92vh] w-full max-w-4xl grid-rows-[auto_1fr] overflow-hidden rounded-t-3xl border-2 border-ink bg-paper sm:grid-cols-[0.9fr_1.1fr] sm:grid-rows-1 sm:rounded-3xl"
      >
        <div className="relative aspect-[5/4] sm:aspect-auto sm:min-h-[540px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {onSale ? (
              <span className="rounded-full bg-pink px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-white uppercase">
                Sale
              </span>
            ) : null}
            {product.isNew ? (
              <span className="rounded-full bg-lime px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-ink uppercase">
                New in
              </span>
            ) : null}
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-lime uppercase backdrop-blur-sm">
            Quick view
          </span>
        </div>

        <div className="flex min-h-0 flex-col overflow-y-auto p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow flex items-center gap-2 text-ink/55">
              <span className="size-1.5 rounded-full bg-pink" />
              {categoryLabel(product.category)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="-mt-1 -mr-1 flex size-9 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-lime"
            >
              <CloseIcon size={16} />
            </button>
          </div>

          <h2 id="quick-view-title" className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">
            {product.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <p className="text-xl font-bold tracking-tight">{formatNaira(product.price)}</p>
            {onSale ? (
              <p className="text-sm text-ink/40 line-through">
                {formatNaira(product.compareAtPrice ?? 0)}
              </p>
            ) : null}
            <p className="text-[10px] tracking-[0.14em] text-ink/45 uppercase">
              {product.stock <= 10 ? `Only ${product.stock} left` : "In stock"}
            </p>
          </div>

          <p className="serif-italic mt-3 line-clamp-3 text-[1.05rem] leading-snug text-ink/75">
            {product.description}
          </p>

          <div className="mt-5">
            <p className="eyebrow text-ink/55">Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  aria-pressed={size === option}
                  className={`min-w-[48px] rounded-full border-[1.5px] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition ${
                    size === option
                      ? "border-ink bg-ink text-lime"
                      : "border-ink/20 hover:border-pink hover:text-pink"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <div className="flex h-12 items-center justify-between rounded-full border-[1.5px] border-ink/20 px-2 sm:w-28">
              <button
                type="button"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                className="flex size-8 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
              >
                <MinusIcon size={13} />
              </button>
              <span className="text-sm font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((value) => Math.min(10, value + 1))}
                aria-label="Increase quantity"
                className="flex size-8 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
              >
                <PlusIcon size={13} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(product, { qty, size });
                onClose();
                setCartOpen(true);
              }}
              className="btn btn-ink flex-1"
            >
              <BagIcon size={15} /> Add to bag · {formatNaira(product.price * qty)}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              className={`btn size-12 shrink-0 px-0 ${
                saved ? "border-pink bg-pink text-white" : "btn-outline"
              }`}
            >
              <HeartIcon size={17} filled={saved} />
            </button>
          </div>

          <ul className="mt-5 grid gap-1.5 text-[11.5px] text-ink/60">
            {["Free delivery over ₦150,000", "14-day returns on unworn pieces"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon size={12} className="shrink-0 text-pink" /> {item}
              </li>
            ))}
          </ul>

          <Link
            href={`/shop/${product.slug}`}
            className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[10px] font-bold tracking-[0.18em] uppercase transition hover:text-pink"
          >
            View full details <ArrowUpRightIcon size={13} className="text-pink" />
          </Link>
        </div>
      </div>
    </div>
  );
}
