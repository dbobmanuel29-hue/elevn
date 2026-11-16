"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRightIcon,
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  SparkIcon,
  UserIcon,
} from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { categories, type Product } from "@/data/catalog";
import { formatNaira } from "@/lib/format";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist, setCartOpen, hydrated } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let previousScrolled = false;

    const updateOnFrame = () => {
      frame = 0;
      const y = window.scrollY;
      const nextScrolled = y > 12;
      if (nextScrolled !== previousScrolled) {
        previousScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateOnFrame);
    };

    updateOnFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const open = menuOpen || searchOpen;
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => searchInput.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const query = term.trim();
    const controller = new AbortController();
    let ignore = false;

    if (query.length >= 2) setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const url =
          query.length >= 2
            ? `/api/products?q=${encodeURIComponent(query)}&limit=6`
            : "/api/products?featured=1&limit=6";
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Search request failed");
        const data = (await response.json()) as { products?: Product[] };
        if (!ignore) setResults(data.products ?? []);
      } catch {
        /* Ignore aborted requests and temporary network errors. */
      } finally {
        if (!ignore) setSearching(false);
      }
    }, query.length >= 2 ? 350 : 0);

    return () => {
      ignore = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [term, searchOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = term.trim();
    setSearchOpen(false);
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  };

  return (
    <>
      <div className="bg-ink text-white">
        <div className="shell flex h-9 items-center justify-between gap-4 overflow-hidden text-[10px] font-medium tracking-[0.2em] uppercase">
          <p className="flex items-center gap-2">
            <SparkIcon size={12} className="text-lime" />
            <span className="hidden sm:inline">SS26 Drop 01 — Now live</span>
            <span className="sm:hidden">SS26 / Drop 01</span>
          </p>
          <p className="hidden md:block">Free delivery over ₦150,000</p>
          <p className="hidden lg:block">Lagos · London · Accra</p>
          <Link href="/shop" className="link-underline shrink-0 text-lime">
            Shop now
          </Link>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-ink/10 bg-paper/95 shadow-[0_8px_24px_-22px_rgba(17,17,17,0.45)] backdrop-blur-md"
            : "border-ink/10 bg-paper"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 md:h-20">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 transition hover:border-ink hover:bg-ink hover:text-lime"
            >
              <MenuIcon size={18} />
            </button>
          </div>

          <Link
            href="/"
            aria-label="ELEVN home"
            className="display shrink-0 text-[26px] leading-none transition-opacity hover:opacity-70 md:text-[30px]"
          >
            ELEVN
            <span className="text-pink">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  className="link-underline text-[11px] font-semibold tracking-[0.2em] uppercase"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="flex size-10 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
            >
              <SearchIcon size={19} />
            </button>
            <Link
              href="/account"
              aria-label="Sign in or view your account"
              className="flex size-10 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
            >
              <UserIcon size={19} />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${hydrated ? wishlist.length : 0} items`}
              className="relative hidden size-10 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime sm:flex"
            >
              <HeartIcon size={19} filled={hydrated && wishlist.length > 0} />
              {hydrated && wishlist.length > 0 ? (
                <span className="absolute top-1 right-0.5 size-1.5 rounded-full bg-pink" />
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping bag, ${hydrated ? cartCount : 0} items`}
              className="relative flex size-10 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
            >
              <BagIcon size={19} />
              <span
                data-testid="cart-count"
                className="absolute -top-0.5 -right-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-pink px-1 text-[10px] leading-[18px] font-bold text-white tabular-nums"
              >
                {hydrated ? cartCount : 0}
              </span>
            </button>
          </div>
        </div>
        <span
          ref={progressRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left bg-pink"
          style={{ transform: "scaleX(0)" }}
        />
      </header>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-lime transition-transform duration-400 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4">
            <span className="display text-2xl">
              ELEVN<span className="text-pink">.</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-full border border-ink/20"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <nav aria-label="Mobile primary" className="px-5 py-4">
            <ul>
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="border-b border-ink/12">
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between py-4"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-ink/40">
                        0{index + 1}
                      </span>
                      <span className="display text-[32px] transition-colors group-hover:text-pink">
                        {link.label}
                      </span>
                    </span>
                    <ArrowRightIcon
                      size={20}
                      className="-translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-5">
            <p className="eyebrow text-ink/50">Shop by category</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="chip hover:bg-pink hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-3 px-5 py-6">
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"
            >
              <HeartIcon size={16} /> Wishlist ({hydrated ? wishlist.length : 0})
            </Link>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"
            >
              <UserIcon size={16} /> Account
            </Link>
            <p className="text-[11px] leading-relaxed text-ink/60">
              hello@elevn.studio · +234 801 234 5678
            </p>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-[70] ${searchOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!searchOpen}
        inert={!searchOpen}
      >
        <div
          onClick={() => setSearchOpen(false)}
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
            searchOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          className={`relative max-h-[88vh] overflow-y-auto bg-lime transition-all duration-400 ${
            searchOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          <div className="shell py-5 md:py-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Search ELEVN</p>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex size-9 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-lime"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <form onSubmit={submitSearch} className="mt-4 flex items-center gap-3 border-b-2 border-ink pb-3">
              <SearchIcon size={24} className="shrink-0 text-ink/50" />
              <input
                ref={searchInput}
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                type="search"
                placeholder="Try “coat”, “knit”, “bag”…"
                aria-label="Search query"
                className="display w-full border-0 bg-transparent text-2xl tracking-normal outline-none placeholder:text-ink/30 md:text-4xl"
              />
              <button type="submit" className="btn btn-ink btn-sm hidden shrink-0 sm:inline-flex">
                Search
              </button>
            </form>

            <div className="mt-6 grid gap-6 pb-8 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="eyebrow text-ink/50">Quick links</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/shop?category=${category.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="chip hover:bg-ink hover:text-lime"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/shop?sort=newest"
                    onClick={() => setSearchOpen(false)}
                    className="chip hover:bg-pink hover:text-white"
                  >
                    New in
                  </Link>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-ink/50">
                    {term.trim().length < 2
                      ? "Popular right now"
                      : searching
                        ? "Searching…"
                        : `${results.length} result${results.length === 1 ? "" : "s"}`}
                  </p>
                  {term.trim().length >= 2 ? (
                    <button
                      type="button"
                      onClick={submitSearch}
                      className="text-[10px] font-semibold tracking-[0.16em] uppercase underline"
                    >
                      View all
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/shop/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition hover:border-ink"
                    >
                      <div className="relative aspect-4/5 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 45vw, 200px"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em]">{product.name}</p>
                        <p className="mt-0.5 text-xs text-ink/60">{formatNaira(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {term.trim().length < 2 ? (
                  <p className="mt-4 text-xs text-ink/60">
                    Start typing to search the full collection — every piece, every category.
                  </p>
                ) : null}

                {term.trim().length >= 2 && !searching && results.length === 0 ? (
                  <p className="mt-4 rounded-xl border border-ink/15 bg-paper p-4 text-xs text-ink/70">
                    No pieces matched “{term.trim()}”. Try a broader term like “jacket” or browse{" "}
                    <Link href="/shop" onClick={() => setSearchOpen(false)} className="underline">
                      all products
                    </Link>
                    .
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
