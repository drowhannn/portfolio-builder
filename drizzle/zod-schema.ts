import { about, blog, blogCategory, experienceArea, service, testimonial, work, workCategory } from './schema'
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

export const createWorkCategorySchema = createInsertSchema(workCategory).omit({
  id: true,
})

export const updateWorkCategorySchema = createWorkCategorySchema.partial()

export const createBlogCategorySchema = createInsertSchema(blogCategory).omit({
  id: true,
})

export const updateBlogCategorySchema = createBlogCategorySchema.partial()

export const createWorkSchema = createInsertSchema(work).omit({
  id: true,
})

export const updateWorkSchema = createWorkSchema.partial()

export const createBlogTagSchema = createInsertSchema(blogCategory).omit({
  id: true,
})

export const updateBlogTagSchema = createBlogTagSchema.partial()

export const createBlogSchema = createInsertSchema(blog).omit({
  id: true,
})

export const updateBlogSchema = createBlogSchema.partial()
