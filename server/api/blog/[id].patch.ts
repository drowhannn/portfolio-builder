import { blog, blogsToBlogTags } from '../../../drizzle/schema'
import { updateBlogSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const response = await update(event, {
    model: blog,
    schema: updateBlogSchema,
    manyToManyRelationships: [
      {
        model: blogsToBlogTags,
        accessorKey: 'tags',
        foreignKey: 'blogId',
        foreignKeyAccessor: 'blogTagId',
      },
    ],
  })
  return response
})
