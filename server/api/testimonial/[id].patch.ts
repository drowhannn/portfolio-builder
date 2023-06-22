import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { testimonial } from '../../../drizzle/schema'
import { updateTestimonialSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateTestimonialSchema.parse(body)
  const response = await db
    .update(testimonial)
    .set(validatedBody)
    .where(eq(testimonial.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]
})
