import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DropCountdown } from "@/components/drop-countdown";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  InstagramIcon,
  PinIcon,
  ReturnIcon,
  ShieldIcon,
  SparkIcon,
  TruckIcon,
} from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ShopTheLook, type Look } from "@/components/shop-the-look";
import { SpotlightActions } from "@/components/spotlight-actions";
import { categories, editorial, HERO_IMAGE, PROMO_IMAGE, type Product } from "@/data/catalog";
import {
  COMMUNITY,
  CRAFT,
  HERO_PICK_SLUG,
  LOOKS,
  PRESS,
  SERVICES,
  SPOTLIGHT_DETAIL_IMAGE,
  SPOTLIGHT_SLUG,
  STUDIO_IMAGE,
  TESTIMONIALS,
} from "@/data/home";
import { formatNaira } from "@/lib/format";
import { queryProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "ELEVN — Create a Fashion Vibe" },
  description:
    "Minimal fashion designed for everyday confidence. Shop the ELEVN SS26 collection: women, men, streetwear and accessories in premium fabrics.",
};

const MARQUEE_ITEMS = [
  "Free delivery over ₦150,000",
  "SS26 Drop 01 — live now",
  "Premium fabrics, fair pricing",
  "Made in Lagos, worn worldwide",
  "14-day easy returns",
  "Small batches, no repeats",
];

const VALUE_PROPS = [
  { Icon: TruckIcon, title: "Nationwide delivery", copy: "Lagos in 24h, Nigeria in 2–4 days." },
  { Icon: ReturnIcon, title: "14-day returns", copy: "Changed your mind? No stress." },
  { Icon: ShieldIcon, title: "Demo checkout", copy: "Try simulated card or bank transfer payments." },
  { Icon: SparkIcon, title: "Limited runs", copy: "Small batches. No mass repeats." },
];

export default async function HomePage() {
  const all = await queryProducts({ limit: 100 });
  const bySlug = new Map(all.map((product) => [product.slug, product]));

  const newArrivals = all.filter((product) => product.isNew).slice(0, 4);
  const featured = all.filter((product) => product.featured);
  const bestSellers = [...featured, ...all.filter((product) => !product.featured)].slice(0, 8);
  const spotlight = bySlug.get(SPOTLIGHT_SLUG) ?? featured[0] ?? all[0] ?? null;
  const heroPick = bySlug.get(HERO_PICK_SLUG) ?? featured[0] ?? null;
  const looks: Look[] = LOOKS.map((look) => ({
    id: look.id,
    title: look.title,
    caption: look.caption,
    image: look.image,
    hotspots: look.hotspots,
    products: look.slugs
      .map((slug) => bySlug.get(slug))
      .filter((product): product is Product => Boolean(product)),
  })).filter((look) => look.products.length > 0);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="grain overflow-hidden bg-lime">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.16) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="shell relative">
          <p
            aria-hidden="true"
            className="eyebrow absolute top-1/2 right-3 hidden -translate-y-1/2 text-ink/40 [writing-mode:vertical-rl] xl:block"
          >
            SS26 — Volume 01 — Lagos
          </p>

          <div className="grid items-center gap-12 pt-8 pb-12 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:py-14">
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-pink" />
                <p className="eyebrow">New season · SS26 / Volume 01</p>
              </div>

              <h1 className="display mt-6 text-[clamp(3.4rem,10.5vw,9rem)]">
                <span className="block">Create a</span>
                <span className="outline-ink block">Fashion</span>
                <span className="block">
                  Vibe<span className="text-pink">.</span>
                </span>
              </h1>

              <p className="serif-italic mt-6 max-w-md text-[clamp(1.25rem,2vw,1.6rem)] text-ink/85">
                Minimal fashion designed for everyday confidence.
              </p>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink/60">
                Structured outerwear, elevated basics and quiet statement pieces — cut to move with
                you from first light to last call.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/shop" className="btn btn-ink btn-lg group w-full sm:w-auto">
                  Shop now
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/collection" className="btn btn-outline btn-lg group w-full sm:w-auto">
                  Explore collection
                  <span className="flex size-6 items-center justify-center rounded-full bg-ink text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                    <ArrowUpRightIcon size={12} />
                  </span>
                </Link>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/15 pt-5">
                <div>
                  <dt className="eyebrow text-ink/45">Pieces</dt>
                  <dd className="display mt-1.5 text-2xl">{String(all.length).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink/45">Categories</dt>
                  <dd className="display mt-1.5 text-2xl">0{categories.length}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink/45">Delivery</dt>
                  <dd className="mt-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Free over ₦150k
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-full max-w-[560px]">
                <div className="absolute -top-2 -left-2 hidden size-20 rounded-full border border-ink/20 sm:block" />
                <div className="relative overflow-hidden rounded-[1.75rem] rounded-tr-[6rem] border-2 border-ink bg-mist shadow-[12px_12px_0_0_rgba(198,247,53,0.7)] sm:shadow-[16px_16px_0_0_rgba(198,247,53,0.7)]">
                  <Image
                    src={HERO_IMAGE}
                    alt="ELEVN model wearing a tailored white suit from the SS26 collection"
                    width={1100}
                    height={1400}
                    priority
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="h-[400px] w-full object-cover object-[center_22%] sm:h-[520px] lg:h-[640px] xl:h-[680px]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-4">
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-white/85 uppercase">
                      The SS26 Editorial
                    </p>
                    <span className="rounded-full bg-lime px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-ink uppercase">
                      In studio
                    </span>
                  </div>
                </div>

                <div className="absolute -top-1 right-4 hidden animate-float rounded-full bg-ink px-3.5 py-2 text-[10px] font-bold tracking-[0.18em] text-lime uppercase sm:block">
                  Drop 01
                </div>

                {heroPick ? (
                  <Link
                    href={`/shop/${heroPick.slug}`}
                    className="group absolute -bottom-6 left-2 flex w-[236px] items-center gap-3 rounded-xl border border-ink/10 bg-paper p-2.5 shadow-[0_18px_40px_-24px_rgba(17,17,17,0.7)] transition hover:-translate-y-1 hover:border-ink sm:left-6"
                  >
                    <Image
                      src={heroPick.image}
                      alt={heroPick.name}
                      width={120}
                      height={150}
                      sizes="64px"
                      className="size-16 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[8.5px] font-semibold tracking-[0.16em] text-pink uppercase">
                        Most wanted
                      </p>
                      <p className="mt-0.5 truncate text-[11px] font-bold uppercase">{heroPick.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink/60">{formatNaira(heroPick.price)}</p>
                    </div>
                    <ArrowUpRightIcon
                      size={14}
                      className="ml-auto shrink-0 transition group-hover:text-pink"
                    />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 pb-8 lg:flex">
            <span className="eyebrow text-ink/45">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-ink/15">
              <span className="animate-scroll-cue absolute inset-0 bg-pink" />
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ MARQUEE */}
      <section aria-label="Store highlights" className="overflow-hidden border-y border-ink bg-ink py-3">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {MARQUEE_ITEMS.map((item, index) => (
                <span key={`${copy}-${item}`} className="flex items-center">
                  <span
                    className={
                      index % 2 === 0
                        ? "px-6 text-[11px] font-semibold tracking-[0.22em] text-lime uppercase"
                        : "serif-italic px-6 text-[17px] text-lime/90"
                    }
                  >
                    {item}
                  </span>
                  <span className="text-pink">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- CATEGORIES */}
      <section className="bg-lime py-14 md:py-20" aria-labelledby="categories-heading">
        <div className="shell">
          <Reveal>
            <SectionHeader
              id="categories-heading"
              number="01"
              eyebrow="Shop by category"
              title="Four edits. One wardrobe."
              subtitle="Cut for the way you actually dress — not the way a lookbook says you should."
              action={{ href: "/shop", label: "All products" }}
            />
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 70}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group relative block aspect-3/4 overflow-hidden rounded-xl bg-ink"
                >
                  <Image
                    src={category.image}
                    alt={`Shop ${category.name} at ELEVN`}
                    fill
                    sizes="(max-width: 640px) 48vw, (max-width: 1024px) 45vw, 24vw"
                    className="object-cover opacity-95 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/5 transition-colors duration-500 group-hover:from-ink/90" />
                  <span className="absolute top-3 left-3 rounded-full bg-lime px-2 py-1 text-[8px] font-bold tracking-[0.18em] text-ink uppercase">
                    0{index + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-4">
                    <p className="display text-[clamp(1.35rem,3.6vw,2rem)]">{category.name}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="serif-italic text-[13px] leading-tight text-white/75">
                        {category.tagline}
                      </p>
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/40 transition group-hover:border-pink group-hover:bg-pink">
                        <ArrowUpRightIcon size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- NEW ARRIVALS */}
      <section className="bg-paper py-14 md:py-20" aria-labelledby="new-arrivals-heading">
        <div className="shell">
          <Reveal>
            <SectionHeader
              id="new-arrivals-heading"
              number="02"
              eyebrow="Just landed"
              title="New arrivals"
              subtitle="Timeless pieces crafted with premium fabrics."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
            {newArrivals.map((product, index) => (
              <Reveal key={product.slug} delay={index * 60}>
                <ProductCard product={product} priority={index < 2} />
              </Reveal>
            ))}
          </div>

          {newArrivals.length === 0 ? (
            <p className="mt-8 text-center text-sm text-ink/60">
              New pieces are landing shortly — browse the full collection in the meantime.
            </p>
          ) : null}

          <Reveal className="mt-10 flex justify-center">
            <Link href="/shop" className="btn btn-ink btn-lg group">
              View all products
              <ArrowRightIcon
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- SPOTLIGHT */}
      {spotlight ? (
        <section className="border-t border-ink/10 bg-lime py-14 md:py-20" aria-labelledby="spotlight-heading">
          <div className="shell">
            <Reveal className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
              <div className="relative">
                <div className="relative aspect-4/5 overflow-hidden rounded-[1.5rem] border-2 border-ink bg-mist">
                  <Image
                    src={spotlight.image}
                    alt={spotlight.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-ink uppercase">
                    Piece of the season
                  </span>
                  <span className="absolute right-4 bottom-4 rounded-full bg-ink/85 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-lime uppercase backdrop-blur-sm">
                    {spotlight.stock} left
                  </span>
                </div>
                <div className="absolute -right-2 bottom-10 hidden w-40 overflow-hidden rounded-xl border-2 border-lime shadow-[0_18px_40px_-20px_rgba(17,17,17,0.7)] sm:block md:w-48 lg:-right-8">
                  <div className="relative aspect-3/4">
                    <Image
                      src={SPOTLIGHT_DETAIL_IMAGE}
                      alt={`${spotlight.name} — campaign detail`}
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>
                  <p className="bg-ink px-3 py-2 text-[8.5px] font-bold tracking-[0.16em] text-lime uppercase">
                    Campaign still · 02
                  </p>
                </div>
              </div>

              <div>
                <p className="eyebrow flex items-center gap-2.5 text-ink/60">
                  <span className="numeral">03</span>
                  <span className="h-px w-6 bg-ink/30" />
                  Spotlight
                </p>
                <h2 id="spotlight-heading" className="display mt-4 text-[clamp(2.3rem,5vw,4.2rem)]">
                  {spotlight.name}
                  <span className="text-pink">.</span>
                </h2>
                <p className="serif-italic mt-3 text-[clamp(1.1rem,1.7vw,1.45rem)] text-ink/70">
                  The centrepiece of SS26 — cut once, worn for a decade.
                </p>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
                  {spotlight.description}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {spotlight.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-[12px] text-ink/70">
                      <CheckIcon size={13} className="mt-0.5 shrink-0 text-pink" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="display text-3xl md:text-4xl">{formatNaira(spotlight.price)}</p>
                  <p className="text-[10px] tracking-[0.14em] text-ink/45 uppercase">
                    Sizes {spotlight.sizes.join(" / ")}
                  </p>
                </div>
                <div className="mt-5">
                  <SpotlightActions product={spotlight} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------- BEST SELLERS */}
      <section className="border-t border-ink/10 bg-lime py-14 md:py-20" aria-labelledby="best-sellers-heading">
        <div className="shell">
          <Reveal>
            <SectionHeader
              id="best-sellers-heading"
              number="04"
              eyebrow="Most wanted"
              title="Best sellers"
              subtitle="The pieces that sell out first, every single drop."
              action={{ href: "/shop", label: "Shop all" }}
            />
          </Reveal>
          <div className="mt-9">
            <ProductCarousel products={bestSellers} label="Best sellers" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- PROMO */}
      <section className="bg-lime py-4 md:py-6" aria-labelledby="promo-heading">
        <div className="shell">
          <Reveal className="relative overflow-hidden rounded-[1.5rem] bg-ink text-white">
            <div className="grid lg:grid-cols-[1.05fr_1fr]">
              <div className="relative z-10 order-2 flex flex-col justify-center p-6 py-10 sm:p-10 md:py-14 lg:order-1 lg:p-14">
                <p className="eyebrow flex items-center gap-2.5 text-lime">
                  <span className="numeral">05</span>
                  <span className="h-px w-6 bg-lime/40" />
                  Season 26 · Campaign
                </p>
                <h2
                  id="promo-heading"
                  className="display mt-4 text-[clamp(2.3rem,5.6vw,4.75rem)] text-lime"
                >
                  Designed for
                  <br />
                  every season<span className="text-pink">.</span>
                </h2>
                <p className="serif-italic mt-4 text-[clamp(1.15rem,1.8vw,1.5rem)] text-white/80">
                  Comfort meets modern aesthetic.
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  Layer light, build heavy — pieces that hold their shape from first wear to
                  fiftieth.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/collection" className="btn btn-lime btn-lg group w-full sm:w-auto">
                    Explore collection
                    <ArrowRightIcon
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                  <Link href="/shop" className="btn btn-outline btn-lg w-full sm:w-auto">
                    Shop the edit
                  </Link>
                </div>
                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                  {["Heavyweight cotton", "Wool blends", "Limited runs"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-[10px] text-white/55">
                      <CheckIcon size={12} className="text-lime" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative order-1 min-h-[300px] lg:order-2 lg:min-h-[560px]">
                <Image
                  src={PROMO_IMAGE}
                  alt="Two ELEVN models wearing oversized hoodies from the all-season campaign"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_28%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/70 lg:via-transparent lg:to-transparent" />
                <div className="absolute top-4 right-4 rounded-full bg-pink px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-white uppercase">
                  Campaign 26
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ SHOP THE LOOK */}
      {looks.length > 0 ? (
        <section className="bg-paper py-14 md:py-20" aria-labelledby="looks-heading">
          <div className="shell">
            <Reveal>
              <SectionHeader
                id="looks-heading"
                number="06"
                eyebrow="Styled by the studio"
                title="Shop the look"
                subtitle="Complete outfits, one tap. Add the full look or pick only the pieces you need."
                action={{ href: "/collection", label: "View lookbook" }}
              />
            </Reveal>
            <Reveal className="mt-9" delay={80}>
              <ShopTheLook looks={looks} />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------------------------- CRAFT */}
      <section className="bg-ink py-16 text-white md:py-24" aria-labelledby="craft-heading">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader
                id="craft-heading"
                tone="dark"
                number="07"
                eyebrow="Made with intention"
                title={
                  <>
                    Fabric first.
                    <br />
                    Always.
                  </>
                }
                subtitle="We start with the mill, not the mood board."
              />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
                Every fabric is chosen for how it drapes, breathes and ages. If it does not improve
                with wear, it does not make the collection. Small runs, repaired for life.
              </p>
              <Link href="/about" className="btn btn-lime mt-7 group">
                Our story
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>

            <div className="divide-y divide-white/12 border-y border-white/12">
              {CRAFT.map((item, index) => (
                <Reveal
                  key={item.number}
                  delay={index * 80}
                  className="grid grid-cols-[3rem_1fr] gap-4 py-6"
                >
                  <span className="display text-2xl text-pink">{item.number}</span>
                  <div>
                    <h3 className="display text-xl text-lime md:text-2xl">{item.title}</h3>
                    <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/60">
                      {item.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map(({ Icon, title, copy }) => (
              <div key={title} className="flex items-start gap-3 bg-ink p-4 md:p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase">{title}</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-white/50">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- COUNTDOWN */}
      <section className="bg-lime py-14 md:py-20" aria-labelledby="drop-heading">
        <div className="shell">
          <Reveal>
            <DropCountdown />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- EDITORIAL */}
      <section className="border-t border-ink/10 bg-lime py-14 md:py-20" aria-labelledby="editorial-heading">
        <div className="shell">
          <Reveal>
            <SectionHeader
              id="editorial-heading"
              number="09"
              eyebrow="Studio journal"
              title="From the studio"
              subtitle="Notes, fittings and the references behind the season."
              action={{ href: "/collection", label: "Read the lookbook" }}
            />
          </Reveal>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {editorial.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <Link href="/collection" className="group block overflow-hidden rounded-2xl bg-ink">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-[9px] font-bold tracking-[0.2em] text-pink uppercase">
                        {item.tag}
                      </p>
                      <p className="display mt-1 text-2xl md:text-3xl">{item.title}</p>
                      <p className="serif-italic mt-1.5 max-w-sm text-[15px] text-white/75">
                        {item.copy}
                      </p>
                    </div>
                    <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-lime text-ink transition group-hover:bg-pink group-hover:text-white">
                      <ArrowUpRightIcon size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ REVIEWS */}
      <section className="bg-paper py-14 md:py-20" aria-labelledby="reviews-heading">
        <div className="shell">
          <Reveal>
            <SectionHeader
              id="reviews-heading"
              number="10"
              eyebrow="Word of mouth"
              title="Worn, washed, reviewed"
              subtitle="Real notes from the people who live in ELEVN."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((item, index) => (
              <Reveal key={item.name} delay={index * 70}>
                <figure className="flex h-full flex-col rounded-2xl border border-ink/12 bg-lime/50 p-6 transition-colors duration-300 hover:border-ink">
                  <div className="flex gap-1 text-pink" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <span key={star} aria-hidden="true" className="text-sm leading-none">
                        ✦
                      </span>
                    ))}
                  </div>
                  <blockquote className="serif-italic mt-4 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-snug text-ink/85">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-auto pt-6">
                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase">
                      {item.name} <span className="text-ink/40">· {item.city}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-ink/50">Bought: {item.piece}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 border-t border-ink/12 pt-6">
            <p className="eyebrow text-center text-ink/45">As featured in</p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {PRESS.map((name, index) => (
                <li key={name} className="flex items-center gap-8">
                  <span className="display text-xl text-ink/35 md:text-2xl">{name}</span>
                  {index < PRESS.length - 1 ? (
                    <span aria-hidden="true" className="hidden size-1.5 rounded-full bg-pink sm:block" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- COMMUNITY */}
      <section className="bg-lime py-14 md:py-20" aria-labelledby="community-heading">
        <div className="shell">
          <Reveal>
            <SectionHeader
              id="community-heading"
              number="11"
              eyebrow="#ELEVNvibe"
              title="Worn by the city"
              subtitle="Tag us to be featured — Lagos, London, Accra and everywhere between."
              action={{ href: "https://instagram.com", label: "Follow @elevn", external: true }}
            />
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
            {COMMUNITY.map((item, index) => (
              <Reveal key={item.handle} delay={index * 50}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${item.handle} on Instagram — ${item.caption}`}
                  className="group relative block aspect-square overflow-hidden rounded-xl bg-ink"
                >
                  <Image
                    src={item.image}
                    alt={`${item.caption} — styled by ${item.handle}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 text-white">
                    <span className="block text-[10px] font-bold tracking-[0.14em]">{item.handle}</span>
                    <span className="serif-italic block text-[13px] text-white/75">{item.caption}</span>
                  </span>
                  <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-lime text-ink opacity-0 transition group-hover:opacity-100">
                    <InstagramIcon size={12} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- SERVICES */}
      <section className="border-t border-ink/10 bg-lime py-14 md:py-20" aria-labelledby="services-heading">
        <div className="shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <Reveal className="relative min-h-[400px] overflow-hidden rounded-[1.5rem] border-2 border-ink bg-ink text-white">
            <Image
              src={STUDIO_IMAGE}
              alt="Inside the ELEVN studio in Victoria Island, Lagos"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
            <div className="relative flex h-full min-h-[400px] flex-col justify-end p-6 md:p-8">
              <p className="eyebrow text-lime">Visit the studio</p>
              <p className="display mt-3 text-3xl md:text-4xl">Victoria Island, Lagos</p>
              <p className="mt-3 flex items-start gap-2 text-[12.5px] text-white/70">
                <PinIcon size={14} className="mt-0.5 shrink-0 text-pink" />
                14 Adeola Odeku Street · Mon – Sat, 9am – 6pm WAT
              </p>
              <Link href="/contact" className="btn btn-lime mt-5 w-fit">
                Book an appointment <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeader
                id="services-heading"
                number="12"
                eyebrow="At your service"
                title="More than a checkout"
                subtitle="Styling, alterations and gifting — the parts of fashion a cart can’t do."
              />
            </Reveal>
            <ul className="mt-7 divide-y divide-ink/12 border-y border-ink/12">
              {SERVICES.map((service, index) => (
                <Reveal key={service.number} as="li" delay={index * 70}>
                  <Link
                    href="/contact"
                    aria-label={service.cta}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-5"
                  >
                    <span className="display text-lg text-pink">{service.number}</span>
                    <div>
                      <h3 className="text-[13px] font-bold tracking-[0.08em] uppercase transition-colors group-hover:text-pink">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-[12.5px] leading-relaxed text-ink/60">
                        {service.copy}
                      </p>
                      <span className="mt-2 inline-block text-[9.5px] font-bold tracking-[0.16em] text-ink/45 uppercase">
                        {service.cta}
                      </span>
                    </div>
                    <span className="mt-0.5 flex size-9 items-center justify-center rounded-full border border-ink transition group-hover:bg-ink group-hover:text-lime">
                      <ArrowUpRightIcon size={14} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- NEWSLETTER */}
      <section
        id="newsletter"
        className="relative scroll-mt-28 overflow-hidden bg-lime pb-16"
        aria-labelledby="newsletter-heading"
      >
        <div className="shell">
          <Reveal className="relative overflow-hidden rounded-[1.5rem] border-2 border-ink bg-lime p-6 sm:p-9 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-6 text-[10rem] leading-none font-black text-pink/15 select-none md:text-[15rem]"
            >
              ✳
            </div>
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow flex items-center gap-2.5 text-ink/60">
                  <span className="numeral">13</span>
                  <span className="h-px w-6 bg-ink/30" />
                  Stay close
                </p>
                <h2
                  id="newsletter-heading"
                  className="display mt-4 text-[clamp(2rem,4.6vw,3.6rem)]"
                >
                  Join our
                  <br />
                  newsletter<span className="text-pink">.</span>
                </h2>
                <p className="serif-italic mt-3 max-w-sm text-[clamp(1.1rem,1.7vw,1.4rem)] text-ink/70">
                  Get updates on new arrivals and exclusive offers.
                </p>
                <p className="mt-2 text-sm text-ink/55">One email a week, never more.</p>
              </div>
              <div className="lg:pb-1">
                <NewsletterForm source="homepage" />
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/15 pt-4 text-[10px] font-semibold tracking-[0.14em] text-ink/50 uppercase">
                  <span>Early access</span>
                  <span className="text-pink">·</span>
                  <span>Restock alerts</span>
                  <span className="text-pink">·</span>
                  <span>Members-only drops</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
