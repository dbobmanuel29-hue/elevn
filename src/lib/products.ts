import { and, asc, desc, eq, gte, ilike, lte, or, sql, type SQL } from "drizzle-orm";

import { db } from "@/db";
import { products as productsTable, type ProductRow } from "@/db/schema";
import { fallbackProducts, type CategorySlug, type Product } from "@/data/catalog";

export type ProductQuery = {
  category?: string;
  q?: string;
  sort?: string;
  limit?: number;
  featuredOnly?: boolean;
  newOnly?: boolean;
  onSale?: boolean;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "28", "30", "32", "34", "36", "One size"];

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as CategorySlug,
    price: row.price,
    compareAtPrice: row.compareAtPrice ?? null,
    image: row.imageUrl,
    description: row.description,
    details: row.details ?? [],
    sizes: row.sizes ?? [],
    badge: row.badge ?? null,
    isNew: row.isNew,
    featured: row.featured,
    stock: row.stock,
  };
}

export function isOnSale(product: Product): boolean {
  return product.compareAtPrice !== null && product.compareAtPrice > product.price;
}

function sortProducts(list: Product[], sort?: string): Product[] {
  const items = [...list];
  switch (sort) {
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "newest":
      return items.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return items;
  }
}

function filterFallback(query: ProductQuery): Product[] {
  const q = query.q?.trim().toLowerCase();
  let items = fallbackProducts.filter((product) => {
    if (query.category && query.category !== "all" && product.category !== query.category) {
      return false;
    }
    if (query.featuredOnly && !product.featured) return false;
    if (query.newOnly && !product.isNew) return false;
    if (query.onSale && !isOnSale(product)) return false;
    if (query.size && !product.sizes.includes(query.size)) return false;
    if (typeof query.minPrice === "number" && product.price < query.minPrice) return false;
    if (typeof query.maxPrice === "number" && product.price > query.maxPrice) return false;
    if (q) {
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  items = sortProducts(items, query.sort);
  return typeof query.limit === "number" ? items.slice(0, query.limit) : items;
}

export async function queryProducts(query: ProductQuery = {}): Promise<Product[]> {
  try {
    const filters: SQL[] = [];

    if (query.category && query.category !== "all") {
      filters.push(eq(productsTable.category, query.category));
    }
    if (query.q?.trim()) {
      const term = `%${query.q.trim()}%`;
      const search = or(
        ilike(productsTable.name, term),
        ilike(productsTable.category, term),
        ilike(productsTable.description, term),
      );
      if (search) filters.push(search);
    }
    if (query.featuredOnly) filters.push(eq(productsTable.featured, true));
    if (query.newOnly) filters.push(eq(productsTable.isNew, true));
    if (query.onSale) {
      filters.push(sql`${productsTable.compareAtPrice} > ${productsTable.price}`);
    }
    if (query.size) {
      filters.push(sql`${productsTable.sizes} @> ${JSON.stringify([query.size])}::jsonb`);
    }
    if (typeof query.minPrice === "number") filters.push(gte(productsTable.price, query.minPrice));
    if (typeof query.maxPrice === "number") filters.push(lte(productsTable.price, query.maxPrice));

    const orderBy =
      query.sort === "price-asc"
        ? [asc(productsTable.price)]
        : query.sort === "price-desc"
          ? [desc(productsTable.price)]
          : query.sort === "newest"
            ? [desc(productsTable.isNew), asc(productsTable.sortOrder), asc(productsTable.id)]
            : [asc(productsTable.sortOrder), asc(productsTable.id)];

    const rows = await db
      .select()
      .from(productsTable)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(...orderBy)
      .limit(query.limit ?? 100);

    if (rows.length === 0) {
      // Empty database (e.g. not yet seeded) — serve the static catalogue.
      return filterFallback(query);
    }

    return rows.map(mapRow);
  } catch {
    return filterFallback(query);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const rows = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .limit(1);
    if (rows[0]) return mapRow(rows[0]);
  } catch {
    // fall through to static catalogue
  }
  return fallbackProducts.find((product) => product.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await queryProducts({ limit: 100 });
  const sameCategory = all.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const others = all.filter(
    (item) => item.slug !== product.slug && item.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getProductSlugs(): Promise<string[]> {
  const all = await queryProducts({ limit: 100 });
  return all.map((product) => product.slug);
}
