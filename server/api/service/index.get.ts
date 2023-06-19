import { db } from '../../../drizzle/db'
import { service } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const services = db.select().from(service)
  return services
})
