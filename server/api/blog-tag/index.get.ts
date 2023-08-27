import { blogTag } from '../../../drizzle/schema'
import { listBlogTagSchema } from '../../../drizzle/zod-schema'

import { list } from '../../utils/rest'

export default defineEventHandler(async (event) => {
  const response = await list(event, {
    model: blogTag,
    schema: listBlogTagSchema,
  })
  return response
})
