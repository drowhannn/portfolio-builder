import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

// for migrations
const migrationClient = postgres('postgresql://postgres:postgres@localhost:5432/portfoliodb', { max: 1 })
migrate(drizzle(migrationClient), {
  migrationsFolder: './drizzle/migrations',
}).then(() => {
  console.log('migrations complete')
  process.exit(0)
}
).catch((err) => {
  console.error(err)
  process.exit(1)
})
