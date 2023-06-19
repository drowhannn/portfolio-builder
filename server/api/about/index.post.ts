import { about } from '../../../drizzle/schema'
import { createAboutSchema } from '../../../drizzle/zod-schema'
import { db } from '../../../drizzle/db'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedBody = createAboutSchema.parse(body)
    const newAbout = await db
      .insert(about)
      .values({ id: 1, ...validatedBody })
      .returning()
    return newAbout[0]!
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    // TODO: - fix this
    // @ts-ignore
    else if (err?.code == '23505') {
      return { error: 'About already exists' }
    }
    return { error: 'Something went wrong' }
  }
})
