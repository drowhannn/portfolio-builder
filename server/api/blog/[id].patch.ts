import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { blogCategory } from '../../../drizzle/schema'
import { updateBlogCategorySchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateBlogCategorySchema.parse(body)
  const response = await db
    .update(blogCategory)
    .set(validatedBody)
    .where(eq(blogCategory.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]
})
