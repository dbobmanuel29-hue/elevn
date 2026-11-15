"use client";

import { ProductCarousel } from "@/components/product-carousel";
import { SectionHeader } from "@/components/section-header";
import { useStore } from "@/components/store-provider";

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const { recentlyViewed, hydrated } = useStore();
  const items = recentlyViewed.filter((item) => item.slug !== excludeSlug);

  if (!hydrated || items.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-lime py-12 md:py-16" aria-labelledby="recent-heading">
      <div className="shell">
        <SectionHeader
          id="recent-heading"
          eyebrow="Your trail"
          title="Recently viewed"
          subtitle="Pick up where you left off — saved in this browser."
          action={{ href: "/wishlist", label: "Your wishlist" }}
        />
        <div className="mt-8">
          <ProductCarousel products={items} label="Recently viewed products" />
        </div>
      </div>
    </section>
  );
}
