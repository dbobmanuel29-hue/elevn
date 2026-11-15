import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalogPath = join(__dirname, "..", "src", "data", "catalog.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));

const connectionString =
  process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

const pool = new pg.Pool({ connectionString });

const insertSql = `
  INSERT INTO products
    (slug, name, category, price, compare_at_price, image_url, description, details, sizes, badge, is_new, featured, stock, sort_order)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11, $12, $13, $14)
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    image_url = EXCLUDED.image_url,
    description = EXCLUDED.description,
    details = EXCLUDED.details,
    sizes = EXCLUDED.sizes,
    badge = EXCLUDED.badge,
    is_new = EXCLUDED.is_new,
    featured = EXCLUDED.featured,
    stock = EXCLUDED.stock,
    sort_order = EXCLUDED.sort_order
`;

try {
  for (const [index, product] of catalog.products.entries()) {
    await pool.query(insertSql, [
      product.slug,
      product.name,
      product.category,
      product.price,
      product.compareAtPrice ?? null,
      product.image,
      product.description,
      JSON.stringify(product.details ?? []),
      JSON.stringify(product.sizes ?? []),
      product.badge ?? null,
      Boolean(product.isNew),
      Boolean(product.featured),
      product.stock ?? 24,
      index,
    ]);
  }

  const count = await pool.query("SELECT COUNT(*)::int AS count FROM products");
  console.log(`Seeded ${count.rows[0].count} products.`);
} catch (error) {
  console.error("Seed failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
