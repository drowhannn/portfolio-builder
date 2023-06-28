import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

const migrationClient = postgres('postgresql://postgres:postgres@localhost:5432/portfoliodb', { max: 1 })
migrate(drizzle(migrationClient), './drizzle/migrations')
