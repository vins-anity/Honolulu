import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example: Posts table (simple example)
export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Example: Todos table (CRUD example with all operations)
export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    completed: boolean("completed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
