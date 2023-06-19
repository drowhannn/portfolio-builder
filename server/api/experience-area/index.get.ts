import { sql } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { experienceArea } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const page = Number(getQuery(event)['page']) || 1

  const experienceAreas = await db
    .select()
    .from(experienceArea)
    .limit(config.pageSize)
    .offset((page - 1) * config.pageSize)

  const experienceAreasCount = await db.select({ count: sql<number>`count(*)` }).from(experienceArea)

  return {
    results: experienceAreas,
    pagination: {
      page,
      pages: Math.ceil(experienceAreasCount[0]!.count / config.pageSize),
      total: experienceAreasCount[0]!.count,
      size: config.pageSize,
    },
  }
})
