import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "ELEVN website terms: demo storefront notice, product information, pricing in Nigerian naira, delivery and returns.",
};

const SECTIONS = [
  {
    title: "1. Demo storefront notice",
    body: [
      "This website is a demonstration fashion storefront. Product browsing, search, the shopping bag and the wishlist are fully functional and stored in your browser. Checkout, payment processing and order fulfilment are not connected — no payment is collected and no order is created.",
    ],
  },
  {
    title: "2. Products and pricing",
    body: [
      "Products, descriptions and imagery are displayed for demonstration. Prices are shown in Nigerian naira (₦) and may not include delivery. Where a sale price is shown, the crossed-out price reflects the previous listed price.",
    ],
  },
  {
    title: "3. Delivery and returns",
    body: [
      "Standard delivery estimates in this demonstration are next-day for Lagos and 2–4 business days nationwide, with free standard delivery on orders over ₦150,000. Returns of unworn pieces with tags attached are accepted within 14 days in the real store; nothing can be returned from this demonstration because no order is created.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "The ELEVN name, logo, layout and written content on this site are the property of ELEVN. Photography is used for demonstration purposes and remains the property of the respective photographers.",
    ],
  },
  {
    title: "5. Limitation of liability",
    body: [
      "Because this is a demonstration, the site is provided “as is” without warranties. We are not liable for any loss arising from use of the demonstration storefront.",
    ],
  },
  {
    title: "6. Contact",
    body: [
      "Questions about these terms: hello@elevn.studio · +234 801 234 5678 · 14 Adeola Odeku Street, Victoria Island, Lagos.",
    ],
  },
];

export default function TermsPage() {
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
          <span className="text-ink">Terms &amp; Conditions</span>
        </nav>

        <h1 className="display mt-4 text-[clamp(2.2rem,5.6vw,4.25rem)]">
          Terms &amp;
          <br />
          conditions<span className="text-pink">.</span>
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
          <div className="flex flex-wrap gap-2 border-t border-ink/12 pt-4">
            <Link href="/privacy" className="btn btn-outline btn-sm">
              Privacy policy
            </Link>
            <Link href="/contact" className="btn btn-ink btn-sm">
              Contact the studio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
