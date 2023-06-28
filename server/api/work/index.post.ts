import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { work } from '../../../drizzle/schema'
import { createWorkSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createWorkSchema.parse(body)
    const response = await db.insert(work).values(validatedBody).returning()
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
