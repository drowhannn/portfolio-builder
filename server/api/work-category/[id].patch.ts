import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { workCategory } from '../../../drizzle/schema'
import { updateWorkCategorySchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateWorkCategorySchema.parse(body)
  const response = await db
    .update(workCategory)
    .set(validatedBody)
    .where(eq(workCategory.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]
})
