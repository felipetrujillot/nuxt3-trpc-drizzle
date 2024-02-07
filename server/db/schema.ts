import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  float,
} from "drizzle-orm/mysql-core";

/**
 *
 */
export const users = mysqlTable("users", {
  id_user: int("id_user").autoincrement().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  active: int("active").notNull().default(1),
  phone: int("phone").notNull(),
  flow_customer_id: varchar("flow_customer_id", { length: 255 }).notNull(),
  flow_sub_id: varchar("flow_sub_id", { length: 255 }).notNull(),
  company_name: varchar("company_name", { length: 255 }).notNull(),
  company_rut: varchar("company_rut", { length: 255 }).notNull(),
  company_giro: varchar("company_giro", { length: 255 }).notNull(),
  company_address: varchar("company_address", { length: 255 }).notNull(),
  company_razon_social: varchar("company_razon_social", {
    length: 255,
  }).notNull(),
  company_comuna: varchar("company_comuna", { length: 255 }).notNull(),
  company_region: varchar("company_region", { length: 255 }).notNull(),
  company_phone: varchar("company_phone", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});

export type Users = typeof users.$inferSelect;
