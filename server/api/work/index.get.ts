import { sql } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { work } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const page = Number(getQuery(event)['page']) || 1

  const results = await db
    .select()
    .from(work)
    .limit(config.pageSize)
    .offset((page - 1) * config.pageSize)

  const totalCount = await db.select({ count: sql<number>`count(*)` }).from(work)

  return {
    results: results,
    pagination: {
      page,
      pages: Math.ceil(totalCount[0]!.count / config.pageSize),
      total: totalCount[0]!.count,
      size: config.pageSize,
    },
  }
})
