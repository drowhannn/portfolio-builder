import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { experienceArea } from '../../../drizzle/schema'
import { updateServiceSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = updateServiceSchema.parse(body)
  const response = await db
    .update(experienceArea)
    .set(validatedBody)
    .where(eq(experienceArea.id, Number(id)))
  // TODO: Test using id which doesn't exist
  return response
})
