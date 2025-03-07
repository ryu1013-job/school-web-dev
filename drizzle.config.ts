import type { Config } from "drizzle-kit";

const config: Config = {
  dialect: "mysql",
  schema: "./src/db/db2/schema.ts",
  out: "./src/db/db2/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

export default config;
