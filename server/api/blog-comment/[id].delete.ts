import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { blogComment } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  await db.delete(blogComment).where(eq(blogComment.id, Number(id)))
  return {}
})
