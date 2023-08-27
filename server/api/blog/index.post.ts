import { blog, blogsToBlogTags } from '../../../drizzle/schema'
import { createBlogSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  const response = await create(event, {
    model: blog,
    schema: createBlogSchema,
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
