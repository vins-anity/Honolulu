import { eq } from "drizzle-orm";
import { db } from "../db";
import { todos } from "../db/schema";
import type { CreateTodo, UpdateTodo } from "shared";

/**
 * Todos Service Layer
 * 
 * Pure business logic functions - no HTTP concerns.
 * This makes testing easy and keeps routes thin.
 */

export const todosService = {
    /**
     * Get all todos
     */
    async getAll() {
        return db.select().from(todos).orderBy(todos.createdAt);
    },

    /**
     * Get a single todo by ID
     */
    async getById(id: number) {
        const result = await db.select().from(todos).where(eq(todos.id, id));
        return result[0] ?? null;
    },

    /**
     * Create a new todo
     */
    async create(data: CreateTodo) {
        const result = await db
            .insert(todos)
            .values({
                title: data.title,
                description: data.description ?? null,
            })
            .returning();
        return result[0];
    },

    /**
     * Update an existing todo
     */
    async update(id: number, data: UpdateTodo) {
        const result = await db
            .update(todos)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(todos.id, id))
            .returning();
        return result[0] ?? null;
    },

    /**
     * Delete a todo
     */
    async delete(id: number) {
        const result = await db.delete(todos).where(eq(todos.id, id)).returning();
        return result[0] ?? null;
    },

    /**
     * Toggle todo completion status
     */
    async toggleComplete(id: number) {
        const todo = await todosService.getById(id);
        if (!todo) return null;

        return todosService.update(id, { completed: !todo.completed });
    },
};
