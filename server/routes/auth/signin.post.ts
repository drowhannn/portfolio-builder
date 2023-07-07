import { z } from 'zod'
import { db } from '../../../drizzle/db'
import { eq } from 'drizzle-orm'
import { user } from '../../../drizzle/schema'
import * as bcrypt from 'bcrypt'
import { generateTokens } from '../../utils/jwt'

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().max(256),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = signinSchema.parse(body)
    const signinUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    })
    if (!signinUser) {
      throw new Error('Invalid email or password')
    }
    if (!(await bcrypt.compare(password, signinUser.password))) {
      throw new Error('Invalid email or password')
    }

    const { accessToken, refreshToken } = generateTokens(signinUser.id)

    const { password: userPassword, ...signInUserDetailWithouthPassword } = signinUser

    return {
      ...signInUserDetailWithouthPassword,
      accessToken,
      refreshToken,
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.issues
    }
    if (err instanceof Error) {
      return {
        error: err.message,
      }
    }
    return {
      error: 'Something went wrong',
    }
  }
})
