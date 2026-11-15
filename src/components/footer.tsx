import Link from "next/link";

import {
  ArrowUpRightIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  PinterestIcon,
  TikTokIcon,
  XSocialIcon,
} from "@/components/icons";

const SHOP_LINKS = [
  { href: "/shop", label: "All products" },
  { href: "/shop?sort=newest", label: "New arrivals" },
  { href: "/shop?category=women", label: "Women" },
  { href: "/shop?category=men", label: "Men" },
  { href: "/shop?category=streetwear", label: "Streetwear" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "Our story" },
  { href: "/collection", label: "Collection" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "Account" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/track-order", label: "Track an order" },
];

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
  { href: "https://pinterest.com", label: "Pinterest", Icon: PinterestIcon },
  { href: "https://x.com", label: "X", Icon: XSocialIcon },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="display text-4xl text-lime">
              ELEVN<span className="text-pink">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Modern fashion, made to be lived in. Premium fabrics, considered cuts and a wardrobe
              that works as hard as you do.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-pink hover:bg-pink hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Shop">
            <p className="eyebrow text-lime">Shop</p>
            <ul className="mt-4 space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block text-[13px] text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow text-lime">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block text-[13px] text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-lime">Get in touch</p>
            <ul className="mt-4 space-y-3 text-[13px] text-white/65">
              <li>
                <a
                  href="mailto:hello@elevn.studio"
                  className="flex items-center gap-2 transition hover:text-pink"
                >
                  <MailIcon size={15} /> hello@elevn.studio
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-2 transition hover:text-pink"
                >
                  <PhoneIcon size={15} /> +234 801 234 5678
                </a>
              </li>
              <li className="flex items-start gap-2">
                <PinIcon size={15} className="mt-0.5 shrink-0" />
                <span>
                  14 Adeola Odeku Street,
                  <br />
                  Victoria Island, Lagos, Nigeria
                </span>
              </li>
            </ul>
            <p className="mt-4 text-[11px] tracking-[0.14em] text-white/35 uppercase">
              Mon – Sat · 9am – 6pm WAT
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] text-lime uppercase transition hover:text-pink"
            >
              Talk to the studio <ArrowUpRightIcon size={13} />
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 md:mt-16">
          <p
            aria-hidden="true"
            className="display outline-lime text-[clamp(4.25rem,18vw,16rem)] leading-[0.82] tracking-[-0.06em] select-none"
          >
            ELEVN
          </p>
          <p className="serif-italic mt-3 text-base text-white/50 md:text-lg">
            Create a fashion vibe — since 2019, Lagos.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[11px] leading-relaxed text-white/45 md:mt-12">
          Demo storefront: cart, wishlist and product data are live and stored in this browser. No
          payment is processed and no order is created. Newsletter signups are saved to the store
          database.
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/12 pt-6 text-[11px] text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ELEVN. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/terms" className="link-underline hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="link-underline hover:text-white">Privacy Policy</Link>
            <Link href="/shipping-returns" className="link-underline hover:text-white">Shipping &amp; Returns</Link>
            <Link href="/cookies" className="link-underline hover:text-white">Cookie Policy</Link>
            <Link href="/security" className="link-underline hover:text-white">Security</Link>
            <span className="text-white/30">Lagos · Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
