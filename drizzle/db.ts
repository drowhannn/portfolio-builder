import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// for query purposes
const queryClient = postgres('postgresql://postgres:postgres@localhost:5432/portfoliodb')
export const db = drizzle(queryClient, { schema })
