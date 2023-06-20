import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { service } from '../../../drizzle/schema'
import { updateServiceSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateServiceSchema.parse(body)
  const response = await db
    .update(service)
    .set(validatedBody)
    .where(eq(service.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]
})
