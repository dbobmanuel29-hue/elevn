"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BagIcon, CheckIcon, HeartIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import type { Product } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

export function ProductDetailActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, hydrated, setCartOpen } = useStore();
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [qty, setQty] = useState(1);
  const saved = hydrated && isWishlisted(product.slug);
  const lowStock = product.stock <= 12;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-ink/55">
          Size {product.sizes.length > 1 ? "" : "· one size"}
        </p>
        <p className="text-[10px] tracking-[0.12em] uppercase text-ink/45">
          {lowStock ? `Only ${product.stock} left` : "In stock"}
        </p>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {product.sizes.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSize(option)}
            aria-pressed={size === option}
            className={`min-w-[52px] rounded-full border-[1.5px] px-3.5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition ${
              size === option
                ? "border-ink bg-ink text-lime"
                : "border-ink/20 text-ink hover:border-pink hover:bg-pink hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <div className="flex h-12 items-center justify-between rounded-full border-[1.5px] border-ink/20 px-2 sm:w-32">
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="flex size-8 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
          >
            <MinusIcon size={14} />
          </button>
          <span className="text-sm font-bold tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((value) => Math.min(10, value + 1))}
            aria-label="Increase quantity"
            className="flex size-8 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
          >
            <PlusIcon size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            if (addToCart(product, { qty, size })) setCartOpen(true);
          }}
          className="btn btn-ink flex-1"
        >
          <BagIcon size={16} /> Add to bag · {formatNaira(product.price * qty)}
        </button>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={`btn size-12 shrink-0 border-[1.5px] px-0 ${
            saved ? "border-pink bg-pink text-white" : "border-ink/20 text-ink hover:border-pink hover:text-pink"
          }`}
        >
          <HeartIcon size={18} filled={saved} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          if (addToCart(product, { qty, size })) router.push("/cart");
        }}
        className="btn btn-outline mt-2.5 h-12 w-full"
      >
        Buy now — checkout demo
      </button>

      <ul className="mt-5 grid gap-2 text-[11.5px] text-ink/60">
        {[
          "Free delivery on orders over ₦150,000",
          "14-day returns on unworn pieces",
          "Order before 2pm WAT for same-day Lagos dispatch",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckIcon size={13} className="shrink-0 text-pink" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl border border-ink/15 bg-lime/30 p-3 text-[11px] leading-relaxed text-ink/60">
        Demo storefront: you can complete a simulated card or bank transfer checkout. No real
        payment is collected and no live order is placed.
      </p>
    </div>
  );
}
