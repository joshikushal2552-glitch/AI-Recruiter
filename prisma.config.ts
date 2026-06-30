import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Explicitly direct dotenv to parse your .env.local file workspace target
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});