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

export const posts = pgTable("posts", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	content: text("content"),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

// PostgreSQL プールの設定


const db = drizzle(pool);

(async () => {
  try {
    // ユーザー ID を取得
    const users = await db.select({ id: user.id }).from(user);
    if (users.length === 0) {
      console.log("ユーザーが存在しません。先にユーザーを追加してください。");
      return;
    }

    // 投稿データを生成
    const dummyPosts = Array.from({ length: 10 }).map(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      return {
        id: faker.string.uuid(),
        userId: randomUser.id, // ランダムなユーザー ID を使用
        content: faker.lorem.paragraph(), // ランダムな投稿内容
        imageUrl: faker.image.url(), // ランダムな画像 URL
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // データベースに挿入
    await db.insert(posts).values(dummyPosts);

    console.log("ランダムな投稿データを挿入しました！");
  } catch (error) {
    console.error("データ挿入中にエラーが発生しました:", error);
  } finally {
    pool.end();
  }
})();
