import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CheckIcon, SparkIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ABOUT_IMAGE, categories, PROMO_IMAGE } from "@/data/catalog";

export const metadata: Metadata = {
  title: "About",
  description:
    "ELEVN is a Lagos-born modern fashion label built on premium fabrics, small-batch production and clothing designed for everyday confidence.",
};

const VALUES = [
  {
    title: "Cut for real life",
    copy: "Comfort is not a compromise. Every piece is tested in motion — on commutes, in studios, on long nights.",
  },
  {
    title: "Small batches",
    copy: "We produce in limited runs. Less waste, more intention, and pieces you will not see on every corner.",
  },
  {
    title: "Fabric first",
    copy: "Traceable wool, organic cotton and vegetable-tanned leather from mills we visit in person.",
  },
  {
    title: "Fair making",
    copy: "Made in Lagos with partners we have worked with since day one, at wages we are happy to publish.",
  },
];

const TIMELINE = [
  { year: "2019", title: "A first collection", copy: "Twelve pieces, one rail, a studio in Yaba." },
  { year: "2022", title: "Owned production", copy: "A small factory floor and an in-house pattern room." },
  { year: "2024", title: "Beyond Lagos", copy: "Shipping to Accra, Nairobi and London." },
  { year: "2026", title: "SS26 Volume 01", copy: "Our most complete wardrobe yet — eighteen pieces." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-lime pb-12 md:pb-16">
        <div className="shell pt-8 md:pt-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">About</span>
          </nav>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow flex items-center gap-2 text-ink/60">
                <SparkIcon size={12} className="text-pink" /> Our story
              </p>
              <h1 className="display mt-3 text-[clamp(2.6rem,7.4vw,6rem)]">
                Clothes for
                <br />
                the everyday<span className="text-pink">.</span>
              </h1>
              <p className="serif-italic mt-5 max-w-md text-[clamp(1.15rem,1.8vw,1.5rem)] text-ink/75">
                ELEVN began in a Lagos studio with twelve pieces and a stubborn idea: that
                considered clothing should not need a special occasion.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
                Seven years later the idea has not changed — only the wardrobe around it.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/shop" className="btn btn-ink">
                  Shop the wardrobe <ArrowRightIcon size={15} />
                </Link>
                <Link href="/collection" className="btn btn-outline">
                  View the collection
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.5rem] border-2 border-ink">
                <Image
                  src={ABOUT_IMAGE}
                  alt="ELEVN studio models in modern streetwear"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 44vw"
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-4 rounded-xl border border-ink bg-paper px-4 py-3 shadow-[0_16px_30px_-22px_rgba(17,17,17,0.8)]">
                <p className="display text-2xl">2019</p>
                <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-ink/50">
                  Founded in Lagos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-12 text-white md:py-16">
        <div className="shell grid gap-8 md:grid-cols-3">
          {[
            { value: "12", label: "Markets served" },
            { value: "18", label: "Pieces per drop" },
            { value: "94%", label: "Recycled packaging" },
          ].map((item) => (
            <Reveal key={item.label} className="border-t border-white/15 pt-4">
              <p className="display text-[clamp(2.4rem,5vw,4rem)] text-lime">{item.value}</p>
              <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16" aria-labelledby="values-heading">
        <div className="shell">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-ink/50">What we stand on</p>
            <h2 id="values-heading" className="display mt-2 text-[clamp(2rem,4.6vw,3.4rem)]">
              Four rules we don’t break
            </h2>
          </Reveal>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 60}>
                <div className="h-full rounded-2xl border border-ink/12 bg-lime p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-ink text-lime">
                      <CheckIcon size={12} />
                    </span>
                    <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase">
                      {value.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/60">{value.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lime py-12 md:py-16" aria-labelledby="timeline-heading">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border-2 border-ink">
              <Image
                src={PROMO_IMAGE}
                alt="ELEVN models in the all-season campaign"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                  unoptimized
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <p className="eyebrow text-ink/50">The long way round</p>
            <h2 id="timeline-heading" className="display mt-2 text-[clamp(2rem,4.4vw,3.2rem)]">
              Built slowly, on purpose
            </h2>
            <ol className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
              {TIMELINE.map((item) => (
                <li key={item.year} className="flex gap-4 py-3.5">
                  <span className="w-12 shrink-0 text-[11px] font-bold tracking-[0.1em] text-pink">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-[12px] font-bold tracking-[0.08em] uppercase">{item.title}</p>
                    <p className="mt-0.5 text-[12px] text-ink/55">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16" aria-labelledby="wear-heading">
        <div className="shell grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-ink/50">A wardrobe, not a moment</p>
            <h2 id="wear-heading" className="display mt-2 text-[clamp(2rem,4.6vw,3.4rem)]">
              Designed to be worn on repeat.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
              We think the best pieces earn their place in your week. Start with a strong foundation,
              add a layer with character, and make the outfit your own.
            </p>
            <Link href="/shop" className="btn btn-ink mt-5">Explore the wardrobe <ArrowRightIcon size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {editorial.slice(0, 2).map((item) => (
              <div key={item.title} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-ink">
                <Image src={item.image} alt={item.title} fill unoptimized sizes="(max-width: 1024px) 45vw, 25vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-12 text-white">
                  <p className="eyebrow text-lime">{item.tag}</p>
                  <p className="display mt-1 text-xl">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lime pb-14">
        <div className="shell grid gap-3 sm:grid-cols-2">
          {categories.slice(0, 2).map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative aspect-16/9 overflow-hidden rounded-2xl bg-ink"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                className="object-cover opacity-85 transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                <p className="display text-2xl">{category.name}</p>
                <span className="flex size-8 items-center justify-center rounded-full bg-lime text-ink transition group-hover:bg-pink group-hover:text-white">
                  <ArrowRightIcon size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
