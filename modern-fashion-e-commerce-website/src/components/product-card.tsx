"use client";

import Image from "next/image";
import Link from "next/link";

import { BagIcon, EyeIcon, HeartIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { categoryLabel, type Product } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  compact?: boolean;
};

export function ProductCard({ product, priority = false, compact = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated, openQuickView } = useStore();
  const saved = hydrated && isWishlisted(product.slug);
  const onSale = product.compareAtPrice !== null && product.compareAtPrice > product.price;
  const percentOff = onSale
    ? Math.round((1 - product.price / (product.compareAtPrice ?? product.price)) * 100)
    : 0;
  const lowStock = product.stock <= 10;

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-mist">
        <Link
          href={`/shop/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-10"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
        </Link>

        <div className="pointer-events-none absolute top-2.5 left-2.5 z-20 flex flex-col items-start gap-1.5">
          {onSale ? (
            <span className="rounded-full bg-pink px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-white uppercase">
              Sale −{percentOff}%
            </span>
          ) : null}
          {product.isNew ? (
            <span className="rounded-full bg-lime px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-ink uppercase">
              New
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className={`absolute top-2 right-2 z-20 flex size-8 items-center justify-center rounded-full border backdrop-blur-sm transition ${
            saved
              ? "border-pink bg-pink text-white"
              : "border-ink/10 bg-white/85 text-ink hover:border-pink hover:bg-pink hover:text-white"
          }`}
        >
          <HeartIcon size={14} filled={saved} />
        </button>

        <div className="absolute inset-x-2 bottom-2 z-20 flex gap-1.5 transition-transform duration-300 ease-out sm:translate-y-[130%] sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink text-[9px] font-bold tracking-[0.16em] text-lime uppercase transition-colors duration-300 hover:bg-pink hover:text-white"
          >
            <PlusIcon size={13} /> Quick add
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink backdrop-blur-sm transition-colors duration-300 hover:border-pink hover:bg-pink hover:text-white"
          >
            <EyeIcon size={15} />
          </button>
        </div>
      </div>

      <div className={`flex flex-1 flex-col pt-3 ${compact ? "px-0.5" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <p className="text-[9px] font-semibold tracking-[0.18em] text-ink/45 uppercase">
            {categoryLabel(product.category)}
          </p>
          <div className="flex shrink-0 items-baseline gap-1.5">
            {onSale ? (
              <span className="text-[10px] text-ink/40 line-through">
                {formatNaira(product.compareAtPrice ?? 0)}
              </span>
            ) : null}
            <p className="text-[13px] font-bold">{formatNaira(product.price)}</p>
          </div>
        </div>

        <h3 className="mt-1 text-[13px] leading-snug font-semibold tracking-[0.01em] uppercase">
          <Link
            href={`/shop/${product.slug}`}
            className="link-underline inline-block transition-colors hover:text-pink"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[10px] text-ink/45">
            {lowStock ? (
              <span className="font-semibold text-pink">Only {product.stock} left</span>
            ) : product.sizes.length > 1 ? (
              `${product.sizes.length} sizes`
            ) : (
              (product.sizes[0] ?? "One size")
            )}
          </p>
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to bag`}
            className="flex items-center gap-1.5 rounded-full border border-ink/20 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.14em] uppercase transition hover:border-ink hover:bg-ink hover:text-lime"
          >
            <BagIcon size={12} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
