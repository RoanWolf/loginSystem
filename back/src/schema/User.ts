// models/User.ts
import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

// 定义 users 表
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});
