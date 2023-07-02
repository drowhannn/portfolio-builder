import type { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://postgres:postgres@localhost:5432/portfoliodb',
  },
} satisfies Config
