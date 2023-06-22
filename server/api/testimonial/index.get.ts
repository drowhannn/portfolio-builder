import { sql } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { testimonial } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const page = Number(getQuery(event)['page']) || 1

  const services = await db
    .select()
    .from(testimonial)
    .limit(config.pageSize)
    .offset((page - 1) * config.pageSize)

  const testimonialsCount = await db.select({ count: sql<number>`count(*)` }).from(testimonial)

  return {
    results: services,
    pagination: {
      page,
      pages: Math.ceil(testimonialsCount[0]!.count / config.pageSize),
      total: testimonialsCount[0]!.count,
      size: config.pageSize,
    },
  }
})
