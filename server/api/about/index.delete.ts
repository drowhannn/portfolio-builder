import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { about } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  await db.delete(about).where(eq(about.id, 1))
  return {}
})
