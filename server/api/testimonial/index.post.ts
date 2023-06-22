import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { testimonial } from '../../../drizzle/schema'
import { createTestimonialSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createTestimonialSchema.parse(body)
    const response = await db.insert(testimonial).values(validatedBody).returning()
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
