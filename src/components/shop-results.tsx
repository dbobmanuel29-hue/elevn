"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";

import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  SearchIcon,
  SparkIcon,
} from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { categories, categoryLabel, editorial, type Product } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

export type ShopFilters = {
  q: string;
  category: string;
  sort: string;
  size: string;
  min: number | null;
  max: number | null;
  sale: boolean;
  fresh: boolean;
};

export type ShopFacets = {
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  total: number;
  categoryCounts: Record<string, number>;
};

type Density = 2 | 3 | 4;

const DENSITY_KEY = "elevn.shop.density";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const PRICE_PRESETS: { id: string; label: string; min: number | null; max: number | null }[] = [
  { id: "any", label: "Any price", min: null, max: null },
  { id: "under-50", label: "Under ₦50,000", min: null, max: 50000 },
  { id: "50-100", label: "₦50,000 – ₦100,000", min: 50000, max: 100000 },
  { id: "over-100", label: "₦100,000 and above", min: 100000, max: null },
];

export function buildShopHref(filters: ShopFilters): string {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.category && filters.category !== "all") params.set("category", filters.category);
  if (filters.sort && filters.sort !== "featured") params.set("sort", filters.sort);
  if (filters.size) params.set("size", filters.size);
  if (filters.min !== null) params.set("min", String(filters.min));
  if (filters.max !== null) params.set("max", String(filters.max));
  if (filters.sale) params.set("sale", "1");
  if (filters.fresh) params.set("new", "1");
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

function priceLabel(min: number | null, max: number | null): string {
  const preset = PRICE_PRESETS.find((item) => item.min === min && item.max === max);
  if (preset && preset.id !== "any") return preset.label;
  if (min !== null && max !== null) return `${formatNaira(min)} – ${formatNaira(max)}`;
  if (min !== null) return `From ${formatNaira(min)}`;
  if (max !== null) return `Under ${formatNaira(max)}`;
  return "Any price";
}

function DensityIcon({ cols }: { cols: Density }) {
  const gap = 2;
  const width = (16 - (cols - 1) * gap) / cols;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      {Array.from({ length: cols }).map((_, index) => (
        <rect key={index} x={index * (width + gap)} y="1" width={width} height="14" rx="1" />
      ))}
    </svg>
  );
}

function EditorialTile() {
  const feature = editorial[0];
  return (
    <Link
      href="/collection"
      className="group relative col-span-2 min-h-[280px] overflow-hidden rounded-xl bg-ink text-white"
    >
      <Image
        src={feature.image}
        alt={feature.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover opacity-80 transition-transform duration-[900ms] group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
        <p className="eyebrow text-lime">Styled by the studio</p>
        <p className="display mt-2 text-3xl md:text-4xl">Shop the look</p>
        <p className="serif-italic mt-2 max-w-xs text-[15px] text-white/75">
          Complete outfits, one tap — see how the season layers.
        </p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-lime uppercase">
          View the lookbook
          <span className="flex size-7 items-center justify-center rounded-full bg-lime text-ink transition group-hover:bg-pink group-hover:text-white">
            <ArrowUpRightIcon size={13} />
          </span>
        </span>
      </div>
    </Link>
  );
}

function DropTile() {
  return (
    <Link
      href="/#newsletter"
      className="group relative col-span-2 flex min-h-[280px] flex-col justify-between overflow-hidden rounded-xl border-2 border-ink bg-lime p-5 md:p-7"
    >
      <span
        aria-hidden="true"
        className="display outline-ink pointer-events-none absolute -right-3 -bottom-8 text-[clamp(7rem,16vw,12rem)] leading-none opacity-40 select-none"
      >
        02
      </span>
      <div className="relative">
        <p className="eyebrow flex items-center gap-2 text-ink/60">
          <span className="animate-pulse-dot size-2 rounded-full bg-pink" /> Next release
        </p>
        <p className="display mt-3 text-3xl md:text-4xl">
          Drop 02<span className="text-pink">.</span>
        </p>
        <p className="serif-italic mt-2 max-w-xs text-[15px] text-ink/70">
          Six new silhouettes, Fridays at 10:00 WAT. Subscribers get a 24-hour head start.
        </p>
      </div>
      <span className="relative mt-6 inline-flex w-fit items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase">
        Get notified
        <span className="flex size-7 items-center justify-center rounded-full border border-ink transition group-hover:border-pink group-hover:bg-pink group-hover:text-white">
          <ArrowUpRightIcon size={13} />
        </span>
      </span>
    </Link>
  );
}

function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-4 py-3 text-left"
    >
      <span>
        <span className="block text-[12px] font-bold tracking-[0.08em] uppercase">{label}</span>
        <span className="block text-[11px] text-ink/50">{hint}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-pink" : "bg-ink/20"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : ""
          }`}
        />
      </span>
    </button>
  );
}

function FilterSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-b border-ink/12 py-5 ${className}`}>
      <p className="eyebrow text-ink/55">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

type ShopResultsProps = {
  products: Product[];
  filters: ShopFilters;
  facets: ShopFacets;
};

export function ShopResults({ products, filters, facets }: ShopResultsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(filters.q);
  const [density, setDensity] = useState<Density>(4);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const latest = useRef(filters);
  latest.current = filters;
  const firstRender = useRef(true);
  const lastLocalQuery = useRef<string | null>(null);

  useEffect(() => {
    // A local debounced search updates the URL. Do not copy that intermediate
    // URL value back into the input while the user is still typing.
    if (lastLocalQuery.current === filters.q) {
      lastLocalQuery.current = null;
      return;
    }
    setTerm(filters.q);
  }, [filters.q]);

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(DENSITY_KEY));
      if (stored === 2 || stored === 3 || stored === 4) setDensity(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const changeDensity = (value: Density) => {
    setDensity(value);
    try {
      window.localStorage.setItem(DENSITY_KEY, String(value));
    } catch {
      /* ignore */
    }
  };

  const navigate = (next: Partial<ShopFilters>) => {
    const href = buildShopHref({ ...latest.current, ...next });
    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (term.trim() === latest.current.q) return;
    const timer = setTimeout(() => {
      const query = term.trim();
      lastLocalQuery.current = query;
      navigate({ q: query });
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const pills = useMemo(() => {
    const items: { key: string; label: string; clear: Partial<ShopFilters> }[] = [];
    if (filters.q) items.push({ key: "q", label: `“${filters.q}”`, clear: { q: "" } });
    if (filters.category !== "all") {
      items.push({
        key: "category",
        label: categoryLabel(filters.category),
        clear: { category: "all" },
      });
    }
    if (filters.size) items.push({ key: "size", label: `Size ${filters.size}`, clear: { size: "" } });
    if (filters.min !== null || filters.max !== null) {
      items.push({
        key: "price",
        label: priceLabel(filters.min, filters.max),
        clear: { min: null, max: null },
      });
    }
    if (filters.sale) items.push({ key: "sale", label: "On sale", clear: { sale: false } });
    if (filters.fresh) items.push({ key: "fresh", label: "New in", clear: { fresh: false } });
    return items;
  }, [filters]);

  const refineCount = pills.filter((pill) => pill.key !== "q").length;
  const pricePresetId =
    PRICE_PRESETS.find((item) => item.min === filters.min && item.max === filters.max)?.id ??
    "custom";

  const clearAll = () => {
    setTerm("");
    navigate({
      q: "",
      category: "all",
      sort: "featured",
      size: "",
      min: null,
      max: null,
      sale: false,
      fresh: false,
    });
  };

  const gridItems: ReactNode[] = [];
  products.forEach((product, index) => {
    gridItems.push(
      <Reveal key={product.slug} delay={(index % 4) * 50}>
        <ProductCard product={product} priority={index < 4} />
      </Reveal>,
    );
    if (index === 5 && products.length > 7) gridItems.push(<EditorialTile key="tile-lookbook" />);
    if (index === 11 && products.length > 13) gridItems.push(<DropTile key="tile-drop" />);
  });

  const lgCols =
    density === 2 ? "lg:grid-cols-2" : density === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  const countLabel = isPending
    ? "Updating…"
    : `${products.length} of ${facets.total} piece${facets.total === 1 ? "" : "s"}`;

  return (
    <>
      {/* ------------------------------------------------------------ TOOLBAR */}
      <div className="sticky top-16 z-30 -mx-5 border-b border-ink/10 bg-paper/90 px-5 py-3 backdrop-blur-md md:top-20 md:-mx-10 md:px-10 xl:-mx-14 xl:px-14">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1 md:max-w-sm">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink/45"
            />
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search the collection"
              className="field h-11 pl-10 text-sm [&::-webkit-search-cancel-button]:appearance-none"
            />
            {term ? (
              <button
                type="button"
                onClick={() => {
                  setTerm("");
                  navigate({ q: "" });
                }}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1.5 text-ink/50 transition hover:bg-ink hover:text-lime"
              >
                <CloseIcon size={12} />
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            className="flex h-11 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-ink/20 px-4 text-[11px] font-semibold tracking-[0.12em] uppercase transition hover:border-ink"
          >
            <FilterIcon size={15} />
            <span className="hidden sm:inline">Refine</span>
            {refineCount > 0 ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-pink text-[9px] font-bold text-white">
                {refineCount}
              </span>
            ) : null}
          </button>

          <div className="relative hidden sm:block">
            <label htmlFor="shop-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort"
              value={filters.sort}
              onChange={(event) => navigate({ sort: event.target.value })}
              className="h-11 appearance-none rounded-full border-[1.5px] border-ink/20 bg-transparent pr-9 pl-4 text-[11px] font-semibold tracking-[0.12em] uppercase transition hover:border-ink focus:bg-white"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size={13}
              className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
            />
          </div>

          <div
            role="group"
            aria-label="Grid density"
            className="hidden h-11 items-center gap-0.5 rounded-full border-[1.5px] border-ink/20 p-1 lg:flex"
          >
            {([2, 3, 4] as Density[]).map((cols) => (
              <button
                key={cols}
                type="button"
                onClick={() => changeDensity(cols)}
                aria-pressed={density === cols}
                aria-label={`${cols} columns`}
                className={`flex size-8 items-center justify-center rounded-full transition ${
                  density === cols ? "bg-ink text-lime" : "text-ink/45 hover:text-ink"
                }`}
              >
                <DensityIcon cols={cols} />
              </button>
            ))}
          </div>

          <p
            aria-live="polite"
            className="ml-auto hidden shrink-0 text-[11px] tracking-[0.14em] text-ink/50 uppercase md:block"
          >
            {countLabel}
          </p>
        </div>

        <div className="no-scrollbar -mx-1 mt-2.5 flex items-center gap-2 overflow-x-auto px-1 pb-0.5">
          <button
            type="button"
            onClick={() => navigate({ category: "all" })}
            data-active={filters.category === "all"}
            className="chip shrink-0"
          >
            All <span className="opacity-50">{facets.total}</span>
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => navigate({ category: filters.category === item.slug ? "all" : item.slug })}
              data-active={filters.category === item.slug}
              className="chip shrink-0"
            >
              {item.name}{" "}
              <span className="opacity-50">{facets.categoryCounts[item.slug] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-[11px] tracking-[0.14em] text-ink/50 uppercase md:hidden" aria-live="polite">
          {countLabel}
        </p>
        {pills.length > 0 ? (
          <>
            <span className="eyebrow hidden text-ink/45 md:inline">Refined by</span>
            {pills.map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={() => {
                  if (pill.key === "q") setTerm("");
                  navigate(pill.clear);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-lime uppercase transition hover:bg-pink hover:text-white"
              >
                {pill.label} <CloseIcon size={11} />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-[10px] font-semibold tracking-[0.14em] uppercase underline decoration-pink decoration-2 underline-offset-4"
            >
              Clear all
            </button>
          </>
        ) : null}
      </div>

      {/* --------------------------------------------------------------- GRID */}
      {products.length > 0 ? (
        <div
          aria-busy={isPending}
          className={`mt-6 grid grid-cols-2 gap-x-3 gap-y-9 transition-opacity duration-300 sm:gap-x-4 md:grid-cols-3 ${lgCols} ${
            isPending ? "opacity-50" : "opacity-100"
          }`}
        >
          {gridItems}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl border-2 border-ink bg-lime/40 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-ink text-lime">
            <SparkIcon size={22} />
          </span>
          <div>
            <h2 className="display text-3xl md:text-4xl">No pieces found</h2>
            <p className="serif-italic mx-auto mt-2 max-w-sm text-[1.1rem] text-ink/65">
              Nothing matched that combination. Loosen a filter, or start from one of the edits
              below.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setTerm("");
                  navigate({
                    q: "",
                    category: item.slug,
                    size: "",
                    min: null,
                    max: null,
                    sale: false,
                    fresh: false,
                  });
                }}
                className="chip"
              >
                {item.name}
              </button>
            ))}
          </div>
          <button type="button" onClick={clearAll} className="btn btn-ink">
            Clear all filters
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- DRAWER */}
      <div
        className={`fixed inset-0 z-[70] ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Refine products"
          className={`absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-lime transition-transform duration-400 ease-out md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-[420px] md:rounded-none ${
            drawerOpen
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-x-full md:translate-y-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4">
            <div>
              <p className="eyebrow text-ink/50">Refine</p>
              <h2 className="display mt-1 text-2xl">
                Filters{" "}
                {refineCount > 0 ? <span className="text-pink">({refineCount})</span> : null}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="flex size-10 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-lime"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5">
            <FilterSection title="Category">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate({ category: "all" })}
                  data-active={filters.category === "all"}
                  className="chip"
                >
                  All
                </button>
                {categories.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => navigate({ category: item.slug })}
                    data-active={filters.category === item.slug}
                    className="chip"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Size">
              <div className="flex flex-wrap gap-2">
                {facets.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => navigate({ size: filters.size === size ? "" : size })}
                    aria-pressed={filters.size === size}
                    className={`min-w-[48px] rounded-full border-[1.5px] px-3 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition ${
                      filters.size === size
                        ? "border-ink bg-ink text-lime"
                        : "border-ink/20 hover:border-pink hover:text-pink"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price">
              <div role="radiogroup" aria-label="Price range" className="grid gap-1.5">
                {PRICE_PRESETS.map((preset) => {
                  const checked = pricePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => navigate({ min: preset.min, max: preset.max })}
                      className={`flex items-center justify-between rounded-xl border-[1.5px] px-4 py-3 text-left text-[12px] font-semibold transition ${
                        checked ? "border-ink bg-paper" : "border-ink/15 hover:border-ink/40"
                      }`}
                    >
                      {preset.label}
                      <span
                        className={`size-4 rounded-full border-2 transition ${
                          checked ? "border-pink bg-pink" : "border-ink/30"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10.5px] text-ink/45">
                Collection spans {formatNaira(facets.minPrice)} – {formatNaira(facets.maxPrice)}.
              </p>
            </FilterSection>

            <FilterSection title="Availability">
              <div className="divide-y divide-ink/10">
                <Toggle
                  label="On sale"
                  hint="Reduced pieces only"
                  on={filters.sale}
                  onChange={(value) => navigate({ sale: value })}
                />
                <Toggle
                  label="New in"
                  hint="Fresh from Drop 01"
                  on={filters.fresh}
                  onChange={(value) => navigate({ fresh: value })}
                />
              </div>
            </FilterSection>

            <FilterSection title="Sort by" className="border-b-0 sm:hidden">
              <div role="radiogroup" aria-label="Sort by" className="grid gap-1.5">
                {SORT_OPTIONS.map((option) => {
                  const checked = filters.sort === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => navigate({ sort: option.value })}
                      className={`flex items-center justify-between rounded-xl border-[1.5px] px-4 py-3 text-left text-[12px] font-semibold transition ${
                        checked ? "border-ink bg-paper" : "border-ink/15 hover:border-ink/40"
                      }`}
                    >
                      {option.label}
                      <span
                        className={`size-4 rounded-full border-2 transition ${
                          checked ? "border-pink bg-pink" : "border-ink/30"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </FilterSection>
          </div>

          <div className="flex items-center gap-3 border-t border-ink/15 bg-paper px-5 py-4">
            <button
              type="button"
              onClick={clearAll}
              className="text-[10px] font-semibold tracking-[0.14em] text-ink/60 uppercase transition hover:text-pink"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="btn btn-ink ml-auto flex-1 sm:flex-none"
            >
              {isPending
                ? "Updating…"
                : `Show ${products.length} piece${products.length === 1 ? "" : "s"}`}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
