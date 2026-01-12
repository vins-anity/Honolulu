import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { vValidator } from "@hono/valibot-validator";
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
  return c.json({
    message: "🌺 Welcome to Honolulu API!",
    version: "1.0.0",
    docs: "/docs",
  });
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
