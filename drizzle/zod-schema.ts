import { z } from 'zod'
import { about, service } from './schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const createAboutSchema = createInsertSchema(about, {
  contactEmail: (schema) => schema.contactEmail.email(),
}).omit({
  id: true,
})

export const updateAboutSchema = createAboutSchema.partial()

export const createServiceSchema = createInsertSchema(service).omit({
  id: true,
})

export const updateServiceSchema = createServiceSchema.partial()
