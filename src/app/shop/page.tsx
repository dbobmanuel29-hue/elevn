import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RecentlyViewed } from "@/components/recently-viewed";
import { ShopResults, type ShopFacets, type ShopFilters } from "@/components/shop-results";
import { categories } from "@/data/catalog";
import { formatNaira } from "@/lib/format";
import { queryProducts, SIZE_ORDER } from "@/lib/products";

export const dynamic = "force-dynamic";

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const toInt = (value: string | undefined): number | null => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const SORTS = new Set(["featured", "newest", "price-asc", "price-desc"]);

function parseFilters(params: RawParams): ShopFilters {
  const category = first(params.category) ?? "all";
  const sort = first(params.sort) ?? "featured";
  return {
    q: first(params.q)?.trim() ?? "",
    category: categories.some((item) => item.slug === category) ? category : "all",
    sort: SORTS.has(sort) ? sort : "featured",
    size: first(params.size)?.trim() ?? "",
    min: toInt(first(params.min)),
    max: toInt(first(params.max)),
    sale: first(params.sale) === "1",
    fresh: first(params.new) === "1",
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}): Promise<Metadata> {
  const filters = parseFilters(await searchParams);
  const activeCategory = categories.find((item) => item.slug === filters.category);

  if (filters.q) {
    return {
      title: `Search “${filters.q}”`,
      description: `Results for “${filters.q}” across the ELEVN SS26 collection.`,
    };
  }
  if (activeCategory) {
    return {
      title: `Shop ${activeCategory.name}`,
      description: `${activeCategory.blurb} Shop ${activeCategory.name.toLowerCase()} at ELEVN.`,
    };
  }
  return {
    title: "Shop all",
    description:
      "Browse every ELEVN piece — tailored outerwear, elevated basics, streetwear and accessories. Filter by category, size and price.",
  };
}

const SERVICE_STRIP = [
  { number: "01", title: "Free delivery over ₦150,000", copy: "Nationwide, tracked and insured." },
  { number: "02", title: "14-day easy returns", copy: "Unworn, tags on, no questions asked." },
  { number: "03", title: "Studio support", copy: "Sizing help from real humans, weekdays." },
];

export default async function ShopPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const filters = parseFilters(await searchParams);

  const [products, all] = await Promise.all([
    queryProducts({
      q: filters.q,
      category: filters.category,
      sort: filters.sort,
      size: filters.size || undefined,
      minPrice: filters.min ?? undefined,
      maxPrice: filters.max ?? undefined,
      onSale: filters.sale,
      newOnly: filters.fresh,
    }),
    queryProducts({ limit: 100 }),
  ]);

  const prices = all.map((product) => product.price);
  const presentSizes = new Set(all.flatMap((product) => product.sizes));
  const facets: ShopFacets = {
    sizes: [
      ...SIZE_ORDER.filter((size) => presentSizes.has(size)),
      ...[...presentSizes].filter((size) => !SIZE_ORDER.includes(size)),
    ],
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
    total: all.length,
    categoryCounts: all.reduce<Record<string, number>>((counts, product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
      return counts;
    }, {}),
  };

  const activeCategory = categories.find((item) => item.slug === filters.category);
  const saleCount = all.filter(
    (product) => product.compareAtPrice !== null && product.compareAtPrice > product.price,
  ).length;

  const eyebrow = filters.q
    ? activeCategory
      ? `Search · ${activeCategory.name}`
      : "Search results"
    : activeCategory
      ? `Category · ${activeCategory.name}`
      : "SS26 · Volume 01";

  const subtitle = filters.q
    ? `${products.length} piece${products.length === 1 ? "" : "s"} matched across the collection.`
    : (activeCategory?.blurb ??
      "Premium fabrics, considered cuts and pieces designed to be worn on repeat. Filter the edit, find your fit.");

  return (
    <>
      {/* --------------------------------------------------------------- HERO */}
      <section className="grain overflow-hidden border-b border-ink/10 bg-lime">
        <div className="shell relative pt-8 pb-8 md:pt-10 md:pb-12">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.14em] text-ink/45 uppercase"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            {activeCategory || filters.q ? (
              <Link href="/shop" className="hover:text-ink">
                Shop
              </Link>
            ) : (
              <span className="text-ink">Shop</span>
            )}
            {activeCategory ? (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-ink">{activeCategory.name}</span>
              </>
            ) : null}
            {filters.q ? (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-ink normal-case">“{filters.q}”</span>
              </>
            ) : null}
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow flex items-center gap-2.5 text-ink/60">
                <span className="numeral">Shop</span>
                <span className="h-px w-6 bg-ink/30" />
                {eyebrow}
              </p>

              <h1 className="display mt-4 text-[clamp(2.8rem,8vw,7rem)]">
                {filters.q ? (
                  <>
                    <span className="outline-ink block">Results</span>
                    <span className="block">
                      for{" "}
                      <span className="serif-italic tracking-normal">“{filters.q}”</span>
                    </span>
                  </>
                ) : activeCategory ? (
                  <>
                    <span className="outline-ink block">Shop</span>
                    <span className="block">
                      {activeCategory.name}
                      <span className="text-pink">.</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="outline-ink block">The</span>
                    <span className="block">
                      Collection<span className="text-pink">.</span>
                    </span>
                  </>
                )}
              </h1>

              <p className="serif-italic mt-5 max-w-md text-[clamp(1.15rem,1.8vw,1.5rem)] text-ink/75">
                {subtitle}
              </p>

              <dl className="mt-7 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/15 pt-5">
                <div>
                  <dt className="eyebrow text-ink/45">Showing</dt>
                  <dd className="display mt-1.5 text-2xl">
                    {String(products.length).padStart(2, "0")}
                    <span className="text-ink/35">/{String(facets.total).padStart(2, "0")}</span>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink/45">Price range</dt>
                  <dd className="mt-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase">
                    {formatNaira(facets.minPrice)} – {formatNaira(facets.maxPrice)}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink/45">On sale</dt>
                  <dd className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="display text-2xl text-pink">
                      {String(saleCount).padStart(2, "0")}
                    </span>
                    <Link
                      href="/shop?sale=1"
                      className="text-[9.5px] font-bold tracking-[0.14em] uppercase underline decoration-pink underline-offset-4"
                    >
                      View
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="eyebrow mb-3 text-ink/45 lg:text-right">Browse the edits</p>
              <div className="grid grid-cols-4 gap-2 lg:gap-3">
                {categories.map((item) => {
                  const active = item.slug === filters.category;
                  return (
                    <Link
                      key={item.slug}
                      href={active ? "/shop" : `/shop?category=${item.slug}`}
                      aria-current={active ? "page" : undefined}
                      aria-label={
                        active ? `Clear ${item.name} filter` : `Shop ${item.name}`
                      }
                      className={`group relative aspect-3/4 overflow-hidden rounded-xl border-2 bg-ink transition-all duration-300 ${
                        active
                          ? "border-pink shadow-[6px_6px_0_0_#FF3399]"
                          : "border-transparent hover:-translate-y-1 hover:border-ink"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 24vw, 12vw"
                        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                      <span className="absolute top-2 left-2 rounded-full bg-lime px-1.5 py-0.5 text-[8px] font-bold tracking-[0.14em] text-ink uppercase">
                        {facets.categoryCounts[item.slug] ?? 0}
                      </span>
                      {active ? (
                        <span className="absolute top-2 right-2 size-2 rounded-full bg-pink" />
                      ) : null}
                      <span className="absolute inset-x-0 bottom-0 p-2 text-white md:p-3">
                        <span className="display block text-[clamp(0.8rem,1.7vw,1.25rem)]">
                          {item.name}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ RESULTS */}
      <section className="bg-paper pb-12 md:pb-16">
        <div className="shell">
          <ShopResults products={products} filters={filters} facets={facets} />
        </div>
      </section>

      <RecentlyViewed />

      {/* ------------------------------------------------------------ SERVICE */}
      <section className="border-t border-ink/10 bg-lime py-10 md:py-12">
        <div className="shell grid gap-3 md:grid-cols-3">
          {SERVICE_STRIP.map((item) => (
            <div key={item.number} className="flex gap-4 rounded-xl border border-ink/15 p-4 md:p-5">
              <span className="numeral mt-0.5">{item.number}</span>
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase">{item.title}</p>
                <p className="serif-italic mt-1 text-[15px] text-ink/60">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
