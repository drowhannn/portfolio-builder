import { sql } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { service } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const page = Number(getQuery(event)['page']) || 1

  const services = await db
    .select()
    .from(service)
    .limit(config.pageSize)
    .offset((page - 1) * config.pageSize)

  const servicesCount = await db.select({ count: sql<number>`count(*)` }).from(service)

  return {
    results: services,
    pagination: {
      page,
      pages: Math.ceil(servicesCount[0]!.count / config.pageSize),
      total: servicesCount[0]!.count,
      size: config.pageSize,
    },
  }
})
