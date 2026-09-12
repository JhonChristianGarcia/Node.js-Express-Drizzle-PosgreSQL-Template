import { defineConfig } from "drizzle-kit";
import 'dotenv/config'

export default defineConfig({
  out: './src/drizzle',
  dialect: 'postgresql',
  schema: './src/db/schema/*',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
})
