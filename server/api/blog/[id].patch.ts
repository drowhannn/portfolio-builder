import { blogCategory } from '../../../drizzle/schema'
import { updateBlogCategorySchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  return await update(event, {
    model: blogCategory,
    schema: updateBlogCategorySchema,
  })
})
