import { about } from './schema'
import { createInsertSchema } from 'drizzle-zod'

export const createAboutSchema = createInsertSchema(about).omit({
  id: true,
})
