import { eq } from 'drizzle-orm'
import { db } from '../../../drizzle/db'
import { blog } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const response = await db.query.blog.findFirst({
    where: eq(blog.id, Number(id)),
    with: {
      tags: {
        with: {
          blogTag: true,
        },
      },
      category: true,
    },
  })

  if (!response) {
    throw Error('Resource not found.')
  }
  return response
})
