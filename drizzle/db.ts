import postgres from 'postgres'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/postgres-js'

export const db = drizzle(postgres('postgresql://postgres:postgres@localhost:5432/portfoliodb'), { schema })
