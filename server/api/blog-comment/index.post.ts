import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { blogComment } from '../../../drizzle/schema'
import { createBlogCommentSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createBlogCommentSchema.parse(body)
    const response = await db.insert(blogComment).values(validatedBody).returning()
    return response[0]!
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    return {
      error: 'Something went wrong',
    }
  }
})
