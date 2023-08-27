import { blogTag } from '../../../drizzle/schema'
import { createBlogTagSchema } from '../../../drizzle/zod-schema'

import { handleRest } from '../../utils/rest'

export default defineEventHandler(async (event) => {
  const response = await handleRest(event, {
    model: blogTag,
    schema: createBlogTagSchema,
  })
  return response
})
