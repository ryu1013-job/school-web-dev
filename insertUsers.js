import pkg from "pg"; // CommonJS モジュールを ES Modules としてインポート
import { drizzle } from "drizzle-orm/node-postgres";
import { faker } from "@faker-js/faker";


const { Pool } = pkg; // Pool をデフォルトエクスポートから取得

import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

// PostgreSQL プールの設定


const db = drizzle(pool);

(async () => {
  try {
    // ダミーデータを挿入
    const dummyUsers = Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.datatype.boolean(),
      image: faker.image.avatar(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.insert(user).values(dummyUsers);

    console.log("ダミーデータを挿入しました");
  } catch (error) {
    console.error("データ挿入中にエラーが発生しました:", error);
  } finally {
    pool.end();
  }
})();
