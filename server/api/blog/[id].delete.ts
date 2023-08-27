import { blog } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  return await destroy(event, {
    model: blog,
  })
})
