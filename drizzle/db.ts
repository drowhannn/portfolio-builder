import { drizzle } from 'drizzle-orm/node-postgres'
import pkg from 'pg'

const { Pool } = pkg

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/portfoliodb',
})

export const db = drizzle(pool)
