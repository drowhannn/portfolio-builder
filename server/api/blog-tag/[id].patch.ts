import { blogTag } from '../../../drizzle/schema'
import { updateBlogTagSchema } from '../../../drizzle/zod-schema'
import { update } from '../../utils/rest'

export default defineEventHandler(async (event) => {
  const response = await update(event, {
    model: blogTag,
    schema: updateBlogTagSchema,
  })
  return response
})
