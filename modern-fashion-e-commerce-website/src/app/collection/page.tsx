import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, ArrowUpRightIcon, SparkIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { categories, editorial, HERO_IMAGE, HERO_SECONDARY } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "SS26 Volume 01 — four movements, one wardrobe. Explore the ELEVN collection lookbook: tailored women, considered menswear, streetwear and accessories.",
};

const MOVEMENTS = [
  {
    number: "01",
    title: "Quiet tailoring",
    copy: "Soft-shouldered blazers, column trousers and poplin that holds a line. Clothes for rooms where you would rather be heard than noticed.",
    image: HERO_IMAGE,
    href: "/shop?category=women",
    cta: "Shop women",
  },
  {
    number: "02",
    title: "Considered weight",
    copy: "Wool overcoats, utility twill and pinstripe built for the commute. Layers that keep their structure from morning to midnight.",
    image: categories[1].image,
    href: "/shop?category=men",
    cta: "Shop men",
  },
  {
    number: "03",
    title: "City uniform",
    copy: "Boxy denim, cropped bombers and leather that moves. Washed, worn and photographed on the street it was designed for.",
    image: categories[2].image,
    href: "/shop?category=streetwear",
    cta: "Shop streetwear",
  },
  {
    number: "04",
    title: "The last detail",
    copy: "Leather totes, angular frames and hardware that catches the light. Small objects, disproportionate impact.",
    image: categories[3].image,
    href: "/shop?category=accessories",
    cta: "Shop accessories",
  },
];

const MATERIALS = [
  { title: "Traceable wool", copy: "Mills in Italy and Portugal, audited annually." },
  { title: "Organic cotton", copy: "GOTS-certified jersey and poplin, no shortcuts." },
  { title: "Vegetable-tanned leather", copy: "Slow-tanned in small batches, built to patina." },
];

export default function CollectionPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-lime pb-12 md:pb-16">
        <div className="shell relative pt-8 md:pt-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Collection</span>
          </nav>

          <div className="mt-5 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            <div>
              <p className="eyebrow flex items-center gap-2 text-ink/60">
                <SparkIcon size={12} className="text-pink" /> SS26 · Volume 01
              </p>
              <h1 className="display mt-3 text-[clamp(2.7rem,8vw,6.5rem)]">
                The season
                <br />
                in four
                <br />
                movements<span className="text-pink">.</span>
              </h1>
              <p className="serif-italic mt-5 max-w-md text-[clamp(1.15rem,1.8vw,1.5rem)] text-ink/75">
                A wardrobe built in layers: tailoring that softens, outerwear that protects,
                streetwear that moves and accessories that finish the sentence.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/shop" className="btn btn-ink">
                  Shop the collection <ArrowRightIcon size={15} />
                </Link>
                <Link href="/about" className="btn btn-outline">
                  Our story
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.5rem] border-2 border-ink">
                <Image
                  src={HERO_SECONDARY}
                  alt="ELEVN SS26 campaign portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-2 w-32 overflow-hidden rounded-xl border-2 border-lime shadow-[0_18px_40px_-20px_rgba(17,17,17,0.7)] sm:-left-6 sm:w-40">
                <div className="relative aspect-3/4">
                  <Image
                    src={categories[0].image}
                    alt="SS26 knitwear detail"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-3 -right-2 rounded-full bg-pink px-3.5 py-2 text-[9px] font-bold tracking-[0.18em] text-white uppercase sm:right-2">
                Drop 01 live
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-12 text-white md:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <p className="display max-w-2xl text-[clamp(1.6rem,3.6vw,2.75rem)] text-lime">
              “Quiet structure. Deliberate restraint. Clothing that does the talking so you don’t
              have to.”
            </p>
            <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/45">
              ELEVN Design Studio · Lagos
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {[
              { value: "04", label: "Movements" },
              { value: "18", label: "Pieces" },
              { value: "100%", label: "Limited runs" },
            ].map((item) => (
              <div key={item.label}>
                <p className="display text-3xl text-lime">{item.value}</p>
                <p className="mt-1 text-[9px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16" aria-labelledby="movements-heading">
        <div className="shell">
          <Reveal className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-ink/50">The four movements</p>
              <h2 id="movements-heading" className="display mt-2 text-[clamp(2rem,4.6vw,3.4rem)]">
                Explore the edit
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-ink/55 sm:text-right">
              Each movement is a complete wardrobe on its own — together they are a year of
              dressing.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {MOVEMENTS.map((movement, index) => (
              <Reveal key={movement.number} delay={index * 60}>
                <article
                  className={`grid overflow-hidden rounded-2xl border border-ink/12 bg-lime md:grid-cols-2 ${
                    index % 2 === 1 ? "md:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative min-h-[240px] md:min-h-[320px]">
                    <Image
                      src={movement.image}
                      alt={movement.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-lime px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] uppercase">
                      {movement.number}
                    </span>
                  </figure>
                  <div className="flex flex-col justify-center p-6 md:p-9">
                    <h3 className="display text-[clamp(1.5rem,3vw,2.4rem)]">{movement.title}</h3>
                    <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink/65">
                      {movement.copy}
                    </p>
                    <Link
                      href={movement.href}
                      className="group mt-5 inline-flex w-fit items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase"
                    >
                      {movement.cta}
                      <span className="flex size-7 items-center justify-center rounded-full border border-ink transition group-hover:border-pink group-hover:bg-pink group-hover:text-white">
                        <ArrowUpRightIcon size={13} />
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lime py-12 md:py-16" aria-labelledby="materials-heading">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-ink/55">Made to last</p>
            <h2 id="materials-heading" className="display mt-2 text-[clamp(2rem,4.6vw,3.4rem)]">
              Fabric first.
              <br />
              Always.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
              We start with the mill, not the mood board. Every fabric is chosen for how it drapes,
              breathes and ages. If it does not improve with wear, it does not make the collection.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            {MATERIALS.map((material) => (
              <div key={material.title} className="rounded-xl border border-ink/20 bg-lime p-4">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase">{material.title}</p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-ink/55">{material.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="shell mt-8 grid gap-4 md:grid-cols-2">
          {editorial.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-ink">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[9px] font-bold tracking-[0.18em] text-pink uppercase">
                    {item.tag}
                  </p>
                  <p className="display mt-1 text-2xl">{item.title}</p>
                  <p className="mt-1 max-w-sm text-[11.5px] text-white/65">{item.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-lime pb-14">
        <div className="shell">
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-ink bg-paper px-6 py-10 text-center">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">Find your piece</h2>
            <p className="max-w-md text-sm text-ink/60">
              Eighteen pieces. Small runs. When they are gone, they are gone.
            </p>
            <Link href="/shop" className="btn btn-ink">
              Shop all products <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
