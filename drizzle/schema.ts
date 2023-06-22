import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const about = pgTable('about', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  position: varchar('position', { length: 256 }).notNull(),
  description: text('description').notNull(),
  contactEmail: varchar('contact_email', { length: 256 }).notNull(),
})

export const service = pgTable('service', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  icon: varchar('icon', { length: 256 }).notNull(),
})

export const experienceArea = pgTable('experience_area', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
})

export const testimonial = pgTable('testimonial', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  position: varchar('position', { length: 256 }).notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 256 }).notNull(),
})

export const work = pgTable('work', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  categoryId: integer('category_id')
    .references(() => workCategory.id)
    .notNull(),
})

export const workCategory = pgTable('work_category', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
})

export const workRelations = relations(work, ({ one }) => ({
  category: one(workCategory, {
    fields: [work.categoryId],
    references: [workCategory.id],
  }),
}))

export const blog = pgTable('blog', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  blogCategoryId: integer('blog_category_id')
    .references(() => blogCategory.id)
    .notNull(),
})

export const blogCategory = pgTable('blog_category', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
})

export const blogTags = pgTable('blog_tags', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
})

export const blogComments = pgTable('blog_comments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  comment: text('comment').notNull(),
  blogId: integer('blog_id')
    .references(() => blog.id)
    .notNull(),
})

export const blogRelations = relations(blog, ({ one, many }) => ({
  category: one(blogCategory, {
    fields: [blog.blogCategoryId],
    references: [blogCategory.id],
  }),
  tags: many(blogTags),
  comments: many(blogComments),
}))
