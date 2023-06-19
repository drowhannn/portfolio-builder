import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { about } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const response = await db.select().from(about).where(eq(about.id, 1))
  return response[0] || {}
})
