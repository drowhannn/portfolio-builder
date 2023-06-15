import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const about = pgTable('about', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  position: varchar('position', { length: 256 }),
  description: text('description'),
  cv: varchar('cv', { length: 256 }),
  contactEmail: varchar('contact_email', { length: 256 }),
})

export const service = pgTable('service', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: text('description'),
  icon: varchar('icon', { length: 256 }),
})

export const experienceArea = pgTable('experience_area', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: text('description'),
})
