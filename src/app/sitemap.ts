import type { MetadataRoute } from "next";

import { fallbackProducts } from "@/data/catalog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elevn.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/collection", "/about", "/contact", "/cart", "/wishlist", "/privacy", "/terms", "/shipping-returns", "/cookies", "/security", "/track-order", "/account", "/size-guide", "/reviews", "/faq"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...fallbackProducts.map((product) => ({
      url: `${BASE_URL}/shop/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
