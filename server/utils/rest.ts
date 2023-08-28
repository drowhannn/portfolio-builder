import { z } from 'zod'
import { db } from '../../drizzle/db'
import { PgTableWithColumns, getTableConfig } from 'drizzle-orm/pg-core'
import { H3Event } from 'h3'
import { sql } from 'drizzle-orm'
import { eq } from 'drizzle-orm'

interface CreateOptions<T extends PgTableWithColumns<any>> {
  model: T
  schema: z.ZodObject<any>
  manyToManyRelationships: {
    model: PgTableWithColumns<any>
    accessorKey: string
    foreignKey: string
    foreignKeyAccessor: string
  }[]
}

export async function create<T extends PgTableWithColumns<any>>(
  event: H3Event,
  { model, schema, manyToManyRelationships = [] }: CreateOptions<T>
) {
  const body = await readBody(event)

  const accessorKeys = manyToManyRelationships.map(({ accessorKey }) => accessorKey)

  const extendedSchema = schema.extend(
    Object.fromEntries(accessorKeys.map((accessorKey) => [accessorKey, z.array(z.number()).optional()]))
  )

  const validatedBody = extendedSchema.parse(body)

  const m2m = Object.fromEntries(accessorKeys.map((accessorKey) => [accessorKey, validatedBody[accessorKey] || []]))

  const newData = Object.fromEntries(Object.entries(validatedBody).filter(([key]) => !accessorKeys.includes(key)))

  const res = await db.transaction(async (tx) => {
    // @ts-ignore
    const response = await tx.insert(model).values(newData).returning()
    if (m2m) {
      for (const [accessorKey, values] of Object.entries(m2m)) {
        const m2mrelationship = manyToManyRelationships.find(({ accessorKey: ak }) => ak === accessorKey)
        await tx
          .insert(m2mrelationship!.model)
          .values(
            values.map((value) => ({
              [m2mrelationship!.foreignKey]: response[0]!.id,
              [m2mrelationship!.foreignKeyAccessor]: value,
            }))
          )
          .returning()
      }
    }
    return response[0]
  })
  return res
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

  const { name } = getTableConfig(model) as { name: keyof typeof db.query }

  // @ts-ignore
  const results = await db.query[name].findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
  })

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
