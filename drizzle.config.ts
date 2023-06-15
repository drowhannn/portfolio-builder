import type { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  connectionString: process.env.DB_URL,
} satisfies Config
