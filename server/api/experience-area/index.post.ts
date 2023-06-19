import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { experienceArea } from '../../../drizzle/schema'
import { createExperienceAreaSchema } from '../../../drizzle/zod-schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createExperienceAreaSchema.parse(body)
    const newExperienceArea = await db.insert(experienceArea).values(validatedBody).returning()
    return newExperienceArea[0]!
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    return {
      error: 'Something went wrong',
    }
  }
})
