import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// Keep database initialization lazy during Next.js builds. Vercel builds can
// collect route metadata without a configured production database. Any
// database-backed request will still need DATABASE_URL at runtime.
const globalPool = globalForDb.__arenaNextJsPostgresqlPool;

export const pool =
  globalPool ??
  new Pool(
    databaseUrl
      ? {
          connectionString: databaseUrl,
        }
      : undefined,
  );

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
