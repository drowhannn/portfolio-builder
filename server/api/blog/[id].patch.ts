import { blogCategory, blogsToBlogTags } from '../../../drizzle/schema'
import { updateBlogCategorySchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  return await update(event, {
    model: blogCategory,
    schema: updateBlogCategorySchema,
    manyToManyRelationships: [
      {
        model: blogsToBlogTags,
        accessorKey: 'tags',
        foreignKey: 'blogId',
        foreignKeyAccessor: 'blogTagId',
      },
    ],
  })
})
