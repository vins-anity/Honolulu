import { Hono } from "hono";
import { logger } from "hono/logger";
import { vValidator } from "@hono/valibot-validator";
import { HelloWorldSchema } from "../../shared/src";
import { db } from "./db";
import { posts } from "./db/schema";

const app = new Hono();

// Simple built-in logger (no pino issues)
app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.post("/hello", vValidator("json", HelloWorldSchema), (c) => {
  const data = c.req.valid("json");
  return c.json({
    message: `Hello ${data.message}`,
  });
});

app.get("/posts", async (c) => {
  try {
    const allPosts = await db.select().from(posts);
    return c.json(allPosts);
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

export default {
  port: 3000,
  fetch: app.fetch,
};
