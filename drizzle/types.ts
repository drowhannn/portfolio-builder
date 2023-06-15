import { InferModel } from 'drizzle-orm'
import { about } from './schema'

export type NewAbout = InferModel<typeof about>
