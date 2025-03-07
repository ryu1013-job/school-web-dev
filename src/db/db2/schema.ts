import {
	mediumtext,
	mysqlTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
	id: serial("id").primaryKey(),
	content: text("content").notNull(),
	imageBase64: mediumtext("image_base64"),
	createdAt: timestamp("created_at").defaultNow(),
});
