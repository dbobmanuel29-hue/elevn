import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeftIcon, ArrowUpRightIcon, HeartIcon, SparkIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { RecentlyViewed } from "@/components/recently-viewed";
import { Reveal } from "@/components/reveal";
import { TrackView } from "@/components/track-view";
import { categoryLabel } from "@/data/catalog";
import { formatNaira } from "@/lib/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Piece not found" };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} · ELEVN`,
      description: product.description.slice(0, 155),
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product, 4);

  return (
    <>
      <TrackView product={product} />
      <section className="bg-lime pb-10 md:pb-14">
        <div className="shell pt-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
              {categoryLabel(product.category)}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <Reveal className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-ink/10 bg-mist">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.compareAtPrice && product.compareAtPrice > product.price ? (
                    <span className="rounded-full bg-pink px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-white uppercase">
                      Sale
                    </span>
                  ) : null}
                  {product.isNew ? (
                    <span className="rounded-full bg-lime px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-ink uppercase">
                      New in
                    </span>
                  ) : null}
                </div>
                <div className="absolute right-3 bottom-3 hidden rounded-full bg-ink/85 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-lime uppercase backdrop-blur-sm sm:block">
                  Studio image · SS26
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { label: "Fabric", value: "Premium", icon: SparkIcon },
                  { label: "Fit", value: "True to size", icon: ArrowUpRightIcon },
                  { label: "Edition", value: "Limited", icon: HeartIcon },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-ink/12 bg-lime/40 px-3 py-2.5"
                  >
                    <Icon size={14} className="text-pink" />
                    <p className="mt-1.5 text-[8.5px] font-bold tracking-[0.16em] uppercase text-ink/50">
                      {label}
                    </p>
                    <p className="text-[11px] font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="lg:pt-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow flex items-center gap-2 text-ink/55">
                    <span className="size-1.5 rounded-full bg-pink" />
                    {categoryLabel(product.category)}
                  </p>
                  <h1 className="display mt-3 text-[clamp(2rem,4.6vw,3.4rem)]">{product.name}</h1>
                </div>
                <Link
                  href={`/shop?category=${product.category}`}
                  className="mt-1 hidden shrink-0 rounded-full border border-ink/20 p-2.5 transition hover:border-ink hover:bg-ink hover:text-lime sm:flex"
                  aria-label={`More ${categoryLabel(product.category)} pieces`}
                >
                  <ArrowUpRightIcon size={16} />
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <p className="text-2xl font-bold tracking-tight md:text-3xl">
                  {formatNaira(product.price)}
                </p>
                {product.compareAtPrice && product.compareAtPrice > product.price ? (
                  <>
                    <p className="text-base text-ink/40 line-through">
                      {formatNaira(product.compareAtPrice)}
                    </p>
                    <span className="rounded-full bg-pink px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-white uppercase">
                      Save {formatNaira(product.compareAtPrice - product.price)}
                    </span>
                  </>
                ) : null}
              </div>

              <p className="serif-italic mt-4 max-w-prose text-[clamp(1.05rem,1.5vw,1.3rem)] leading-snug text-ink/75">
                {product.description}
              </p>

              <ProductDetailActions product={product} />

              <div className="mt-6 divide-y divide-ink/12 border-y border-ink/12">
                <details className="group py-3.5" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase">
                    Product details
                    <span className="text-base leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <ul className="mt-3 space-y-1.5">
                    {product.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-[12.5px] text-ink/65">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-pink" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </details>
                <details className="group py-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase">
                    Delivery &amp; returns
                    <span className="text-base leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink/65">
                    <p>Lagos: next-day delivery. Nationwide: 2–4 business days.</p>
                    <p>Free standard delivery on orders over ₦150,000.</p>
                    <p>14-day returns on unworn pieces with tags attached.</p>
                  </div>
                </details>
                <details className="group py-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-bold tracking-[0.14em] uppercase">
                    Sizing &amp; care
                    <span className="text-base leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink/65">
                    <p>Fits true to size. Size up for a relaxed, editorial fit.</p>
                    <p>Follow the care label. Wash cold, inside out, with similar colours.</p>
                    <p>
                      Need a hand?{" "}
                      <Link href="/contact" className="underline decoration-pink underline-offset-4">
                        Talk to the studio
                      </Link>
                      .
                    </p>
                  </div>
                </details>
              </div>

              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-ink/55 transition hover:text-pink"
              >
                <ArrowLeftIcon size={14} /> Back to all products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-paper py-12 md:py-16" aria-labelledby="related-heading">
          <div className="shell">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-ink/50">Styled with</p>
                <h2 id="related-heading" className="display mt-2 text-[clamp(1.8rem,4vw,3rem)]">
                  Complete the look
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.category}`}
                className="hidden items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase sm:inline-flex"
              >
                More {categoryLabel(product.category)}
                <ArrowUpRightIcon size={14} />
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 60}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <RecentlyViewed excludeSlug={product.slug} />
    </>
  );
}
