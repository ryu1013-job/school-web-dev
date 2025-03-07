"use server";

import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "~/db/db2/mysql";
import { posts } from "~/db/db2/schema";

export async function getAllPosts() {
	const allPosts = await db
		.select({
			id: posts.id,
			content: posts.content,
			imageBase64: posts.imageBase64,
			createdAt: posts.createdAt,
		})
		.from(posts)
		.orderBy(desc(posts.createdAt));

	return allPosts;
}
