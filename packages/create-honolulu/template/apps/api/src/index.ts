import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HelloWorldSchema } from "shared";
import { errorHandler } from "./middleware/error";
import todosRoutes from "./routes/todos";

/**
 * Honolulu API
 *
 * A Hono-powered REST API with modular routing.
 *
 * Architecture:
 * - Routes: HTTP layer, validation, response formatting
 * - Services: Business logic, pure functions
 * - DB: Drizzle ORM with PostgreSQL
 *
 * @see https://hono.dev/docs/guides/best-practices
 */

const app = new Hono();

// ============================================
// Global Middleware
// ============================================

// Built-in logger
app.use("*", logger());

// CORS for development (configure for production)
app.use(
    "*",
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    }),
);

// Global error handler
app.use("*", errorHandler);

// ============================================
// Health Check
// ============================================

app.get("/", (c) => {
    return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Honolulu API</title>
    <meta name="description" content="A high-performance Hono API built with Honolulu starter.">
    <meta property="og:title" content="Honolulu API">
    <meta property="og:description" content="A high-performance Hono API built with Honolulu starter.">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary">
    <style>
        body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #fafafa; color: #333; }
        .container { text-align: center; padding: 2rem; border-radius: 12px; background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); max-width: 400px; width: 90%; }
        h1 { margin: 0 0 1rem; color: #ea580c; font-size: 2rem; }
        p { margin: 0 0 1.5rem; line-height: 1.5; color: #4b5563; }
        .btn { display: inline-block; background: #ea580c; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background 0.2s; }
        .btn:hover { background: #c2410c; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌺 Honolulu API</h1>
        <p>Your high-performance API is up and running.</p>
        <a href="/reference" class="btn">View API Docs</a>
    </div>
</body>
</html>
    `);
});

app.get("/health", (c) => {
    return c.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// ============================================
// API Routes
// ============================================

// Hello world example with validation
app.post("/hello", vValidator("json", HelloWorldSchema), (c) => {
    const data = c.req.valid("json");
    return c.json({
        message: `Hello ${data.message}!`,
    });
});

// Todos CRUD (example routes)
app.route("/todos", todosRoutes);

// ============================================
// 404 Handler
// ============================================

app.notFound((c) => {
    return c.json(
        {
            error: "Not Found",
            message: `Route ${c.req.method} ${c.req.path} not found`,
        },
        404,
    );
});

// ============================================
// Server Export
// ============================================

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
};

// Export app for testing
export { app };
