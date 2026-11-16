"use client";

import Link from "next/link";

import { ArrowUpRightIcon, BagIcon, HeartIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import type { Product } from "@/data/catalog";

export function SpotlightActions({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated, setCartOpen } = useStore();
  const saved = hydrated && isWishlisted(product.slug);

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={() => {
          addToCart(product);
          setCartOpen(true);
        }}
        className="btn btn-ink btn-lg"
      >
        <BagIcon size={16} /> Add to bag
      </button>
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-pressed={saved}
        className={`btn btn-lg ${saved ? "border-pink bg-pink text-white" : "btn-outline hover:border-pink hover:bg-pink hover:text-white"}`}
      >
        <HeartIcon size={16} filled={saved} /> {saved ? "Saved" : "Save"}
      </button>
      <Link
        href={`/shop/${product.slug}`}
        className="inline-flex items-center gap-2 py-2 text-[10px] font-bold tracking-[0.18em] uppercase transition hover:text-pink sm:ml-2"
      >
        Full details <ArrowUpRightIcon size={13} className="text-pink" />
      </Link>
    </div>
  );
}
