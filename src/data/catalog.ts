import catalogJson from "./catalog.json";

export type CategorySlug = "women" | "men" | "streetwear" | "accessories";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  blurb: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAtPrice: number | null;
  image: string;
  description: string;
  details: string[];
  sizes: string[];
  badge: string | null;
  isNew: boolean;
  featured: boolean;
  stock: number;
};

export type Editorial = {
  tag: string;
  title: string;
  copy: string;
  image: string;
};

type CatalogFile = {
  categories: Category[];
  products: Omit<Product, "id">[];
  editorial: Editorial[];
};

const catalog = catalogJson as unknown as CatalogFile;

export const categories: Category[] = catalog.categories;
export const editorial: Editorial[] = catalog.editorial;

/**
 * Static catalogue mirror. The live catalogue is stored in PostgreSQL; this is
 * used for seeding and as a resilient fallback if the database is unreachable.
 */
export const fallbackProducts: Product[] = catalog.products.map((product, index) => ({
  ...product,
  id: index + 1,
}));

export function categoryLabel(slug: string): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

export const HERO_IMAGE =
  "https://images.pexels.com/photos/39569777/pexels-photo-39569777.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1100&h=1400";

export const HERO_SECONDARY =
  "https://images.pexels.com/photos/28669447/pexels-photo-28669447.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=620&h=760";

export const PROMO_IMAGE =
  "https://images.pexels.com/photos/30410067/pexels-photo-30410067.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=1000";

export const ABOUT_IMAGE =
  "https://images.pexels.com/photos/18398348/pexels-photo-18398348.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=900";

export const SHOP_HERO_IMAGE =
  "https://images.pexels.com/photos/30916977/pexels-photo-30916977.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=800";
