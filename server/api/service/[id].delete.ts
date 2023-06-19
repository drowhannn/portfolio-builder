import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { service } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  await db.delete(service).where(eq(service.id, Number(id)))
  return {}
})
