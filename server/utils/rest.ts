import { z } from 'zod'
import { db } from '../../drizzle/db'
import { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { H3Event } from 'h3'

type SchemaType =
  | {
      create: z.ZodSchema<any>
      update: z.ZodSchema<any>
    }
  | z.ZodSchema<any>

interface RestAPIOptions<T extends PgTableWithColumns<any>> {
  model: T
  schema: SchemaType
}

interface CreateOptions<T extends PgTableWithColumns<any>> {
  model: T
  schema: z.ZodSchema<any>
}

async function create<T extends PgTableWithColumns<any>>(event: H3Event, { model, schema }: CreateOptions<T>) {
  const body = await readBody(event)
  const validatedBody = schema.parse(body)
  const response = await db.insert(model).values(validatedBody).returning()
  return response[0]!
}

export async function handleRest<T extends PgTableWithColumns<any>>(
  event: H3Event,
  { model, schema }: RestAPIOptions<T>
) {
  const method = getMethod(event)
  if (method === 'POST') {
    try {
      return await create(event, { model, schema: 'create' in schema ? schema.create : schema })
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.issues
      }
      return {
        error: 'Something went wrong',
      }
    }
  }
}
