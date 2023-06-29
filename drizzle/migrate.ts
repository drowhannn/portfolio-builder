import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const db = drizzle(postgres('postgresql://postgres:postgres@localhost:5432/portfoliodb', { max: 1 }))

migrate(db, { migrationsFolder: './drizzle/migrations' })
  .then(() => {
    console.log('migrated')
  })
  .catch((err) => {
    console.log(err)
  })
