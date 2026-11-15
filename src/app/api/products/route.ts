import type { NextRequest } from "next/server";

import { queryProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestedLimit = Number.parseInt(searchParams.get("limit") ?? "48", 10);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 100)
    : 48;

  const toInt = (value: string | null) => {
    const parsed = Number.parseInt(value ?? "", 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
  };

  try {
    const products = await queryProducts({
      q: searchParams.get("q") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      size: searchParams.get("size") ?? undefined,
      minPrice: toInt(searchParams.get("min")),
      maxPrice: toInt(searchParams.get("max")),
      onSale: searchParams.get("sale") === "1",
      featuredOnly: searchParams.get("featured") === "1",
      newOnly: searchParams.get("new") === "1",
      limit,
    });

    return Response.json({ ok: true, count: products.length, products });
  } catch {
    return Response.json({ ok: false, message: "Unable to load products." }, { status: 500 });
  }
}
