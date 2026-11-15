import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ELEVN handles your data: what we store, where cart and wishlist information lives, and how to contact us about privacy.",
};

const SECTIONS = [
  {
    title: "1. What this policy covers",
    body: [
      "This privacy policy explains how ELEVN (“we”, “us”) handles information when you browse and interact with this storefront. This build is a demonstration storefront: payments, account login and order fulfilment are not connected.",
    ],
  },
  {
    title: "2. Information you give us",
    body: [
      "If you subscribe to the newsletter, we store the email address you provide, the page you subscribed from and a timestamp. That record lives in the store database so we can manage the list.",
      "If you contact the studio, we store the name, email address and message you submit so the team can reply. We never ask for card details or government identification through these forms.",
    ],
  },
  {
    title: "3. Information stored in your browser",
    body: [
      "Your shopping bag and wishlist are stored in your browser using localStorage. That data does not leave your device and is not sent to us. Clearing your browser storage or using another browser or device will reset both.",
      "We do not set advertising cookies and we do not sell personal information.",
    ],
  },
  {
    title: "4. How long we keep information",
    body: [
      "Newsletter records are kept until you unsubscribe or ask us to delete them. Contact messages are kept for up to 24 months so we can refer back to a conversation.",
    ],
  },
  {
    title: "5. Your choices",
    body: [
      "You can unsubscribe from the newsletter at any time by replying to any email or writing to hello@elevn.studio. You can request a copy or deletion of the information we hold about you by emailing the same address.",
      "You can clear your bag and wishlist at any time from the cart and wishlist pages, or by clearing your browser storage.",
    ],
  },
  {
    title: "6. Contact",
    body: [
      "Privacy questions: hello@elevn.studio · 14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-lime pb-16">
      <div className="shell max-w-3xl pt-8 md:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
        >
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">Privacy Policy</span>
        </nav>

        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]">
          Privacy
          <br />
          policy<span className="text-pink">.</span>
        </h1>
        <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-ink/45">
          Last updated · February 2026
        </p>

        <div className="mt-7 space-y-6 rounded-2xl border border-ink/15 bg-paper p-5 sm:p-7">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-[13px] font-bold tracking-[0.06em] uppercase">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-[13px] leading-relaxed text-ink/65">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          <div className="border-t border-ink/12 pt-4">
            <Link href="/contact" className="btn btn-ink">
              Ask a privacy question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
