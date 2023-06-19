import { z } from 'zod'
import { updateAboutSchema } from '../../../drizzle/zod-schema'
import { db } from '../../../drizzle/db'
import { about } from '../../../drizzle/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = updateAboutSchema.parse(body)
    const newAbout = await db.update(about).set(validatedBody).returning()
    return newAbout[0]!
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    return { error: 'Something went wrong' }
  }
})
