import { z } from 'zod'
import { db } from '../../drizzle/db'
import { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { H3Event } from 'h3'
import { sql } from 'drizzle-orm'
import { eq } from 'drizzle-orm'

interface CreateOptions<T extends PgTableWithColumns<any>> {
  model: T
  schema: z.ZodSchema<any>
}

export async function create<T extends PgTableWithColumns<any>>(event: H3Event, { model, schema }: CreateOptions<T>) {
  const body = await readBody(event)
  const validatedBody = schema.parse(body)
  const response = await db.insert(model).values(validatedBody).returning()
  return response[0]!
}

interface ListOptions<T extends PgTableWithColumns<any>, S extends z.ZodSchema<any>> {
  model: T
  schema: S
}

export async function list<T extends PgTableWithColumns<any>, S extends z.ZodSchema<any>>(
  event: H3Event,
  { model, schema }: ListOptions<T, S>
) {
  const page = Number(getQuery(event)['page']) || 1

  const config = useRuntimeConfig() as { pageSize?: number }

  const pageSize = config.pageSize || 10

  const results = await db
    .select()
    .from(model)
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  const totalCount = await db.select({ count: sql<number>`count(*)` }).from(model)

  return {
    results: z.array(schema).parse(results),
    pagination: {
      page,
      pages: Math.ceil(totalCount[0]!.count / pageSize),
      total: totalCount[0]!.count,
      size: pageSize,
    },
  }
}

interface RetrieveOptions<T extends PgTableWithColumns<any>, S extends z.ZodSchema<any>> {
  model: T
  schema: S
}

export async function retrieve<T extends PgTableWithColumns<any>, S extends z.ZodSchema<any>>(
  event: H3Event,
  { model, schema }: RetrieveOptions<T, S>
) {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const response = await db
    .select()
    .from(model)
    .where(eq(model.id, Number(id)))
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return schema.parse(response[0]!) as ReturnType<S['parse']>
}

interface UpdateOptions<T extends PgTableWithColumns<any>, S extends z.ZodSchema<any>> {
  model: T
  schema: S
}

export async function update<T extends PgTableWithColumns<any>, S extends z.ZodSchema<any>>(
  event: H3Event,
  { model, schema }: UpdateOptions<T, S>
) {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  const body = await readBody(event)
  const validatedBody = schema.parse(body)
  const response = await db
    .update(model)
    .set(validatedBody)
    .where(eq(model.id, Number(id)))
    .returning()
  if (!response.length) {
    throw Error('Resource not found.')
  }
  return response[0]!
}

interface DeleteOptions<T extends PgTableWithColumns<any>> {
  model: T
}

export async function destroy<T extends PgTableWithColumns<any>>(event: H3Event, { model }: DeleteOptions<T>) {
  const id = getRouterParam(event, 'id')
  if (!Number(id)) {
    throw Error('Id should be number.')
  }
  await db.delete(model).where(eq(model.id, Number(id)))
  return {}
}
