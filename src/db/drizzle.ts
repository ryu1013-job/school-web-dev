import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { account, session, user, verification } from "./schema";

config({ path: ".env" });

const pool = new Pool({
	host: process.env.DATABASE_HOST,
	port: Number.parseInt(process.env.DATABASE_PORT || "5432", 10),
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	ssl: {
		rejectUnauthorized: false, // 自己署名証明書を許可
	},
});

export const db = drizzle(pool, {
	schema: {
		user,
		session,
		account,
		verification,
	},
});
