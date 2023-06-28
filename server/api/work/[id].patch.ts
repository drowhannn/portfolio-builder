import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { work } from '../../../drizzle/schema'
import { updateWorkSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateWorkSchema.parse(body)
  const response = await db
    .update(work)
    .set(validatedBody)
    .where(eq(work.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]
})
