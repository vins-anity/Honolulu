// @ts-nocheck
import { Hono } from "hono";
import { logger } from "hono-pino";
import { pinoLogger } from "hono-pino";
import { vValidator } from "@hono/valibot-validator";
import { HelloWorldSchema } from "shared";
import { db } from "./db";
import { posts } from "./db/schema";

const app = new Hono();

// @ts-ignore
app.use(
  "*",
  logger({
    pino: pinoLogger(),
  }) as any,
);

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
    // Just a check to see if DB helper works, might fail if no DB URL
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
