import { z } from 'zod'
import { about } from './schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const createAboutSchema = createInsertSchema(about, {
  contactEmail: (schema) => schema.contactEmail.email(),
}).omit({
  id: true,
})

export const updateAboutSchema = createAboutSchema.partial()
