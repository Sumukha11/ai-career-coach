import { metadata } from "@/app/layout";
import { timestamp } from "drizzle-orm/mysql-core";
import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

});

export const historyTable = pgTable('historyTable',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recordId: varchar().notNull(),
    content: jsonb(),
    userEmail: varchar('userEmail').references(()=> usersTable.email),
    createdAt: varchar(),
    aiAgentType: varchar(),
    metaData: varchar(),
})