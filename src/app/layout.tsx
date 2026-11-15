import type { Metadata } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";

import { BackToTop } from "@/components/back-to-top";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QuickViewModal } from "@/components/quick-view-modal";
import { StoreProvider } from "@/components/store-provider";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ELEVN — Create a Fashion Vibe",
    template: "%s · ELEVN",
  },
  description:
    "ELEVN is a modern fashion label built on premium fabrics, considered cuts and everyday confidence. Shop women, men, streetwear and accessories.",
  keywords: [
    "ELEVN",
    "fashion",
    "streetwear",
    "Nigerian fashion",
    "women's clothing",
    "men's clothing",
    "accessories",
  ],
  applicationName: "ELEVN",
  openGraph: {
    title: "ELEVN — Create a Fashion Vibe",
    description:
      "Minimal fashion designed for everyday confidence. Premium fabrics, considered cuts, made to be lived in.",
    type: "website",
    siteName: "ELEVN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVN — Create a Fashion Vibe",
    description: "Minimal fashion designed for everyday confidence.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}>
      <body className="antialiased">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:font-bold focus:tracking-[0.16em] focus:text-lime focus:uppercase"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
