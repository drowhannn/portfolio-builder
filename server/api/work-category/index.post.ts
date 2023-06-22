import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { workCategory } from '../../../drizzle/schema'
import { createWorkCategorySchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createWorkCategorySchema.parse(body)
    const response = await db.insert(workCategory).values(validatedBody).returning()
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
