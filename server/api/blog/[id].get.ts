import { blog } from '../../../drizzle/schema'
import { retrieveBlogSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  return await retrieve(event, {
    model: blog,
    schema: retrieveBlogSchema,
  })
})
