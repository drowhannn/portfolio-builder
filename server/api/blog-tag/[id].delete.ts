import { blogTag } from '../../../drizzle/schema'
import { destroy } from '../../utils/rest'

export default defineEventHandler(async (event) => {
  const response = await destroy(event, {
    model: blogTag,
  })
  return response
})
