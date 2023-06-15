import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

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
