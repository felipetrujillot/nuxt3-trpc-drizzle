import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  float,
} from 'drizzle-orm/mysql-core'

/**
 *
 */
export const users = mysqlTable('users', {
  id_user: int('id_user').autoincrement().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const passwords_reset = mysqlTable('passwords_reset', {
  id_password_reset: int('id_password_reset').primaryKey().autoincrement(),
  token: varchar('token', { length: 250 }).notNull(),
  active: int('active').default(1).notNull(),
  id_user: int('id_user').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

export const questions = mysqlTable('questions', {
  id_question: int('id_question').autoincrement().notNull(),
  type: int('type').notNull(),
  title: varchar('title', { length: 250 }).notNull(),
  description: varchar('description', { length: 250 }).notNull(),
})

export const answers = mysqlTable('answers', {
  id_answer: int('id_answer').autoincrement().notNull(),
  text: varchar('text', { length: 250 }).notNull(),
})

export const questions_answers = mysqlTable('questions_answers', {
  id_question_answer: int('id_question_answer').autoincrement().notNull(),
  id_question: int('id_question').notNull(),
  id_answer: int('id_answer').notNull(),
})

export const tests = mysqlTable('tests', {
  id_test: int('id_test').autoincrement().notNull(),
})

export const tests_questions = mysqlTable('tests_questions', {})

export type Questions = typeof questions.$inferSelect

export type PasswordReset = typeof passwords_reset.$inferSelect

export type Users = typeof users.$inferSelect
