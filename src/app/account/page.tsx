import type { Metadata } from "next";
import Link from "next/link";

import { BagIcon, HeartIcon, MailIcon, SparkIcon, UserIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Sign-in and member accounts are in preview at ELEVN. Shop as a guest, save a wishlist and join the newsletter for early access.",
};

const SHORTCUTS = [
  {
    href: "/wishlist",
    label: "Your wishlist",
    copy: "Pieces you have saved in this browser.",
    Icon: HeartIcon,
  },
  {
    href: "/cart",
    label: "Your bag",
    copy: "Review quantities and the order summary.",
    Icon: BagIcon,
  },
  {
    href: "/shop",
    label: "The collection",
    copy: "Eighteen pieces, four categories, small runs.",
    Icon: SparkIcon,
  },
];

export default function AccountPage() {
  return (
    <section className="bg-lime pb-16">
      <div className="shell pt-8 md:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
        >
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">Account</span>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
          <div>
            <p className="eyebrow flex items-center gap-2 text-ink/55">
              <UserIcon size={12} className="text-pink" /> Members
            </p>
            <h1 className="display mt-3 text-[clamp(2.4rem,6.4vw,4.75rem)]">
              Accounts are
              <br />
              coming soon<span className="text-pink">.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65 md:text-[15px]">
              ELEVN currently runs as a guest storefront. Your bag and wishlist are saved in this
              browser, so nothing is lost when you come back. Member sign-in, saved addresses and
              order history are in preview for the next release.
            </p>

            <div className="mt-6 rounded-2xl border-2 border-ink bg-paper p-5">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-ink/50">
                Demo storefront status
              </p>
              <ul className="mt-3 space-y-2.5 text-[12.5px] text-ink/65">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink" />
                  Product catalogue, bag, wishlist and search: live and interactive.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink" />
                  Newsletter and contact forms: saved to the store database.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink" />
                  Payment, order fulfilment and account login: not connected yet.
                </li>
              </ul>
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {SHORTCUTS.map(({ href, label, copy, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-xl border border-ink/20 bg-lime p-3.5 transition hover:border-ink hover:bg-paper"
                >
                  <Icon size={16} className="text-pink" />
                  <p className="mt-2 text-[10.5px] font-bold tracking-[0.1em] uppercase">{label}</p>
                  <p className="mt-1 text-[10.5px] leading-snug text-ink/50">{copy}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-ink bg-paper p-5 sm:p-7">
            <span className="flex size-11 items-center justify-center rounded-full bg-ink text-lime">
              <MailIcon size={19} />
            </span>
            <h2 className="display mt-4 text-3xl">Get early access</h2>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink/60">
              Members hear about drops first and get restock alerts before they go public. Leave
              your email and you’re in.
            </p>
            <div className="mt-5">
              <NewsletterForm source="account" />
            </div>
            <p className="mt-5 border-t border-ink/12 pt-4 text-[10.5px] leading-relaxed text-ink/45">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline decoration-pink underline-offset-4">
                privacy policy
              </Link>
              . Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
