import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { service } from '../../../drizzle/schema'
import { createServiceSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createServiceSchema.parse(body)
    const newService = await db.insert(service).values(validatedBody).returning()
    return newService[0]!
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    return {
      error: 'Something went wrong',
    }
  }
})
