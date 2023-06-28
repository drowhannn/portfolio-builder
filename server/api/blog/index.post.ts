import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { blog } from '../../../drizzle/schema'
import { createBlogSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createBlogSchema.parse(body)
    const response = await db.insert(blog).values(validatedBody).returning()
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
