"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, BagIcon, HeartIcon, TrashIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { categoryLabel } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, hydrated } = useStore();

  return (
    <section className="min-h-[60vh] bg-lime pb-16">
      <div className="shell pt-8 md:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
        >
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">Wishlist</span>
        </nav>

        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-ink/55">
              <HeartIcon size={12} className="text-pink" filled /> Saved for later
            </p>
            <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">
              Wishlist<span className="text-pink">.</span>
            </h1>
          </div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-ink/55">
            {hydrated ? wishlist.length : 0} saved piece{wishlist.length === 1 ? "" : "s"}
          </p>
        </div>

        {!hydrated ? (
          <div className="mt-10 h-64 animate-pulse rounded-2xl border border-ink/10 bg-paper/60" />
        ) : wishlist.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border-2 border-ink bg-paper px-6 py-16 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-pink text-white">
              <HeartIcon size={26} />
            </span>
            <div>
              <h2 className="display text-3xl">Nothing saved yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
                Tap the heart on any piece to keep it here. Your wishlist is stored in this browser.
              </p>
            </div>
            <Link href="/shop" className="btn btn-ink">
              Browse the collection <ArrowRightIcon size={15} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
            {wishlist.map((item) => (
              <article key={item.slug} className="group flex flex-col">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-mist">
                  <Link href={`/shop/${item.slug}`} className="absolute inset-0 z-10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="absolute top-2 right-2 z-20 flex size-8 items-center justify-center rounded-full border border-pink bg-pink text-white transition hover:bg-ink hover:text-lime"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
                <div className="mt-3 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[9px] font-semibold tracking-[0.16em] text-ink/45 uppercase">
                      {categoryLabel(item.category)}
                    </p>
                    <p className="text-[13px] font-bold">{formatNaira(item.price)}</p>
                  </div>
                  <h2 className="mt-1 text-[13px] font-semibold uppercase">
                    <Link href={`/shop/${item.slug}`} className="hover:text-pink">
                      {item.name}
                    </Link>
                  </h2>
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="btn btn-outline btn-sm mt-3 w-full"
                  >
                    <BagIcon size={13} /> Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
