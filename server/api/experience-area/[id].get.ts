import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { experienceArea } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const response = await db
    .select()
    .from(experienceArea)
    .where(eq(experienceArea.id, Number(id)))
  if (!response.length) throw Error('Resource not found.')
  return response[0]
})
