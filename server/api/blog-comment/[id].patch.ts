import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { blogComment } from '../../../drizzle/schema'
import { updateBlogCommentSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateBlogCommentSchema.parse(body)
  const response = await db
    .update(blogComment)
    .set(validatedBody)
    .where(eq(blogComment.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]
})
