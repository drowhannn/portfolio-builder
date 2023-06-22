import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { testimonial } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  await db.delete(testimonial).where(eq(testimonial.id, Number(id)))
  return {}
})
