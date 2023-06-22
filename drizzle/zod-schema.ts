import { about, experienceArea, service, testimonial } from './schema'
import { createInsertSchema } from 'drizzle-zod'

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

export const createExperienceAreaSchema = createInsertSchema(experienceArea).omit({
  id: true,
})

export const updateExperienceAreaSchema = createExperienceAreaSchema.partial()

export const createTestimonialSchema = createInsertSchema(testimonial).omit({
  id: true,
})

export const updateTestimonialSchema = createTestimonialSchema.partial()

export const createWorkCategorySchema = createInsertSchema(testimonial).omit({
  id: true,
})

export const updateWorkCategorySchema = createWorkCategorySchema.partial()
