import { blogTag } from '../../../drizzle/schema'
import { retrieveBlogTagSchema } from '../../../drizzle/zod-schema'
import { retrieve } from '../../utils/rest'

export default defineEventHandler(async (event) => {
  const response = await retrieve(event, {
    model: blogTag,
    schema: retrieveBlogTagSchema,
  })
  return response
})
