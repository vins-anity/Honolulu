import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { CreateTodoSchema, TodoIdSchema, UpdateTodoSchema } from "shared";
import { todosService } from "../services/todos.service";

/**
 * Todos Routes
 *
 * RESTful CRUD endpoints with Valibot validation.
 * Routes are thin - they handle HTTP concerns and delegate to services.
 */

const todos = new Hono();

/**
 * GET /todos
 * List all todos
 */
todos.get("/", async (c) => {
    try {
        const allTodos = await todosService.getAll();
        return c.json({ data: allTodos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return c.json({ error: "Failed to fetch todos" }, 500);
    }
});

/**
 * GET /todos/:id
 * Get a single todo by ID
 */
todos.get("/:id", vValidator("param", TodoIdSchema), async (c) => {
    try {
        const { id } = c.req.valid("param");
        const todo = await todosService.getById(id);

        if (!todo) {
            return c.json({ error: "Todo not found" }, 404);
        }

        return c.json({ data: todo });
    } catch (error) {
        console.error("Error fetching todo:", error);
        return c.json({ error: "Failed to fetch todo" }, 500);
    }
});

/**
 * POST /todos
 * Create a new todo
 */
todos.post("/", vValidator("json", CreateTodoSchema), async (c) => {
    try {
        const data = c.req.valid("json");
        const todo = await todosService.create(data);

        return c.json({ data: todo }, 201);
    } catch (error) {
        console.error("Error creating todo:", error);
        return c.json({ error: "Failed to create todo" }, 500);
    }
});

/**
 * PATCH /todos/:id
 * Update a todo
 */
todos.patch(
    "/:id",
    vValidator("param", TodoIdSchema),
    vValidator("json", UpdateTodoSchema),
    async (c) => {
        try {
            const { id } = c.req.valid("param");
            const data = c.req.valid("json");
            const todo = await todosService.update(id, data);

            if (!todo) {
                return c.json({ error: "Todo not found" }, 404);
            }

            return c.json({ data: todo });
        } catch (error) {
            console.error("Error updating todo:", error);
            return c.json({ error: "Failed to update todo" }, 500);
        }
    },
);

/**
 * DELETE /todos/:id
 * Delete a todo
 */
todos.delete("/:id", vValidator("param", TodoIdSchema), async (c) => {
    try {
        const { id } = c.req.valid("param");
        const todo = await todosService.delete(id);

        if (!todo) {
            return c.json({ error: "Todo not found" }, 404);
        }

        return c.json({ data: todo });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return c.json({ error: "Failed to delete todo" }, 500);
    }
});

/**
 * POST /todos/:id/toggle
 * Toggle todo completion status
 */
todos.post("/:id/toggle", vValidator("param", TodoIdSchema), async (c) => {
    try {
        const { id } = c.req.valid("param");
        const todo = await todosService.toggleComplete(id);

        if (!todo) {
            return c.json({ error: "Todo not found" }, 404);
        }

        return c.json({ data: todo });
    } catch (error) {
        console.error("Error toggling todo:", error);
        return c.json({ error: "Failed to toggle todo" }, 500);
    }
});

export default todos;
