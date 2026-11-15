"use client";

import { useEffect } from "react";

import { useStore } from "@/components/store-provider";
import type { Product } from "@/data/catalog";

/** Records a product in the visitor's recently-viewed trail (localStorage). */
export function TrackView({ product }: { product: Product }) {
  const { hydrated, trackView } = useStore();

  useEffect(() => {
    if (hydrated) trackView(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, product.slug, trackView]);

  return null;
}
