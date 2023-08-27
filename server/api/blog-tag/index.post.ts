import { blogTag } from '../../../drizzle/schema'
import { createBlogTagSchema } from '../../../drizzle/zod-schema'

import { create } from '../../utils/rest'

export default defineEventHandler(async (event) => {
  const response = await create(event, {
    model: blogTag,
    schema: createBlogTagSchema,
  })
  return response
})
