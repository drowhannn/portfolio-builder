import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const queryClient = postgres('postgresql://postgres:postgres@localhost:5432/portfoliodb')
export const db: PostgresJsDatabase = drizzle(queryClient)
