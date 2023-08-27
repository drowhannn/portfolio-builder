import { blog } from '../../../drizzle/schema'
import { createBlogSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  return await create(event, {
    model: blog,
    schema: createBlogSchema,
  })
})
