import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { blog, blogsToBlogTags } from '../../../drizzle/schema'
import { createBlogSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createBlogSchema.parse(body)
    const { tags, ...newData } = validatedBody
    await db.transaction(async (tx) => {
      const response = await tx.insert(blog).values(newData).returning()
      if (tags) {
        await tx
          .insert(blogsToBlogTags)
          .values(
            tags.map((tag) => ({
              blogId: response[0]!.id,
              blogTagId: tag,
            }))
          )
          .returning()
      }
      return response[0]
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    return {
      error: 'Something went wrong',
    }
  }
})
