// import { serial, text, timestamp, integer, pgTable } from "drizzle-orm/pg-core"
const {
  serial,
  text,
  timestamp,
  integer,
  mysqlTable,
} = require("drizzle-orm/mysql-core");

console.log(serial, text);

export const users = mysqlTable("user", {
  userId: serial("userId").primaryKey(),
  firebaseId: text("firebaseId").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  keys: text("keys").notNull(),
  isAdmin: integer("isAdmin").notNull().default(0),
});
