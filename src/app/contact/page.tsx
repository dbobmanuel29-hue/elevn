import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon, SparkIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { ABOUT_IMAGE, PROMO_IMAGE } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the ELEVN studio about sizing, orders, press or wholesale. Lagos based, replying within one business day.",
};

const DETAILS = [
  {
    Icon: MailIcon,
    label: "Email",
    value: "hello@elevn.studio",
    href: "mailto:hello@elevn.studio",
    note: "Replies within one business day",
  },
  {
    Icon: PhoneIcon,
    label: "Phone / WhatsApp",
    value: "+234 801 234 5678",
    href: "tel:+2348012345678",
    note: "Mon – Sat · 9am – 6pm WAT",
  },
  {
    Icon: PinIcon,
    label: "Studio",
    value: "14 Adeola Odeku St, Victoria Island, Lagos",
    href: "https://maps.google.com/?q=Adeola+Odeku+Street+Victoria+Island+Lagos",
    note: "Appointments only",
  },
];

const FAQS = [
  {
    q: "How do I know my size?",
    a: "Every product page lists the available sizes and fit notes. Our pieces are cut true to size; size up for an oversized editorial fit. Still unsure? Message us with your usual size and we’ll advise.",
  },
  {
    q: "How long does delivery take?",
    a: "Lagos orders arrive next day when placed before 2pm WAT. Nationwide delivery is 2–4 business days. Delivery is free on orders over ₦150,000.",
  },
  {
    q: "Can I return a piece?",
    a: "Yes — unworn pieces with tags attached can be returned within 14 days of delivery. Contact the studio to arrange a pickup or drop-off.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to the UK, Ghana and Kenya from the Lagos studio. Email us with the pieces you want and we’ll send a shipping quote.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-paper pb-12 md:pb-16">
        <div className="shell pt-8 md:pt-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
          >
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Contact</span>
          </nav>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
            <div>
              <p className="eyebrow flex items-center gap-2 text-ink/55">
                <SparkIcon size={12} className="text-pink" /> Studio support
              </p>
              <h1 className="display mt-3 text-[clamp(2.6rem,7vw,5.5rem)]">
                Let’s talk
                <br />
                fashion<span className="text-pink">.</span>
              </h1>
              <p className="serif-italic mt-4 max-w-md text-[clamp(1.15rem,1.8vw,1.5rem)] text-ink/75">
                Sizing questions, order help, press requests or a wholesale enquiry — this goes
                straight to the people who make the clothes.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {DETAILS.map(({ Icon, label, value, href, note }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group rounded-xl border border-ink/20 bg-lime p-4 transition hover:border-ink hover:bg-paper"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-9 items-center justify-center rounded-full bg-ink text-lime transition group-hover:bg-pink group-hover:text-white">
                        <Icon size={16} />
                      </span>
                      <ArrowUpRightIcon
                        size={14}
                        className="text-ink/35 transition group-hover:text-pink"
                      />
                    </div>
                    <p className="mt-3 text-[9px] font-bold tracking-[0.18em] uppercase text-ink/45">
                      {label}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-snug font-semibold">{value}</p>
                    <p className="mt-1 text-[10.5px] text-ink/50">{note}</p>
                  </a>
                ))}
                <div className="rounded-xl border border-ink bg-ink p-4 text-white">
                  <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-lime">
                    Response time
                  </p>
                  <p className="display mt-2 text-3xl text-lime">1 day</p>
                  <p className="mt-1 text-[10.5px] text-white/55">
                    Average first reply, Mon – Sat.
                  </p>
                </div>
              </div>
            </div>

            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink py-10 text-white md:py-14" aria-labelledby="support-heading">
        <div className="shell grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="eyebrow text-lime">Here when you need us</p>
            <h2 id="support-heading" className="display mt-2 text-[clamp(2rem,4.5vw,3.3rem)]">
              Good service is part of the fit.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
              Whether you are choosing a size, checking an order or planning a gift, send the studio
              a message and include the details that will help us point you in the right direction.
            </p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-lime uppercase">
              Get to know ELEVN <ArrowUpRightIcon size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[ABOUT_IMAGE, PROMO_IMAGE].map((src, index) => (
              <div key={src} className={`relative overflow-hidden rounded-xl bg-white/10 ${index === 0 ? "aspect-[3/4]" : "mt-8 aspect-[3/4]"}`}>
                <Image src={src} alt={index === 0 ? "ELEVN campaign style" : "ELEVN studio collection"} fill unoptimized sizes="(max-width: 768px) 45vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16" aria-labelledby="faq-heading">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow text-ink/50">Before you write</p>
              <h2 id="faq-heading" className="display mt-3 text-[clamp(2rem,4.4vw,3.2rem)]">
                Quick answers
              </h2>
              <p className="mt-3 max-w-xs text-sm text-ink/60">
                The questions we answer most often. If yours is not here, the form above is the
                fastest route.
              </p>
              <Link
                href="/shop"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase"
              >
                Browse the collection <ArrowUpRightIcon size={14} className="text-pink" />
              </Link>
            </div>

            <div className="divide-y divide-ink/12 border-y border-ink/12">
              {FAQS.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] font-bold tracking-[0.02em] uppercase">
                    {item.q}
                    <span className="text-lg leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-ink/60">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-paper py-12 md:py-16" aria-labelledby="message-guide-heading">
        <div className="shell">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-ink/55">A little detail goes a long way</p>
            <h2 id="message-guide-heading" className="display mt-2 text-[clamp(2rem,4.6vw,3.4rem)]">
              Help us help you faster.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              When you contact the studio, a few useful details can help us understand what you need
              and give you a clearer answer.
            </p>
          </Reveal>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {[
              { number: "01", title: "For an order", copy: "Include your order reference and the email or phone number used at checkout." },
              { number: "02", title: "For sizing", copy: "Tell us the item you are considering, your usual size and the fit you prefer." },
              { number: "03", title: "For other enquiries", copy: "Choose a clear subject and share the key details, links or dates relevant to your request." },
            ].map((item, index) => (
              <Reveal key={item.number} delay={index * 60}>
                <article className="h-full rounded-xl border border-ink/20 bg-paper p-5">
                  <p className="display text-3xl text-pink">{item.number}</p>
                  <h3 className="mt-3 text-[11px] font-bold tracking-[0.12em] uppercase">{item.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink/60">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16" aria-labelledby="studio-heading">
        <div className="shell grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-ink">
            <Image src={ABOUT_IMAGE} alt="ELEVN studio campaign image" fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <Reveal>
            <p className="eyebrow text-ink/50">The studio is listening</p>
            <h2 id="studio-heading" className="display mt-2 text-[clamp(2rem,4.6vw,3.4rem)]">
              Start a conversation.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
              Prefer a direct route? Reach the team by email for detailed enquiries or call for a
              quick question during studio hours.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:hello@elevn.studio" className="btn btn-ink">Email the studio <ArrowUpRightIcon size={14} /></a>
              <a href="tel:+2348012345678" className="btn btn-outline">Call the studio</a>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
