import { defineConfig, env } from "prisma/config";
import "dotenv/config";

// Prisma 7.8 config API. `datasource.url` is what the CLI (migrate / generate /
// introspect) uses to connect — the schema's datasource block omits the url.
// `env()` resolves DATABASE_URL from the environment (loaded via dotenv above).
export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
