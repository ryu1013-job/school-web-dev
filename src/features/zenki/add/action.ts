"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/db/db2/mysql";
import { posts } from "~/db/db2/schema";

export async function addPost(params: {
	content: string;
	imageBase64: string | null;
}) {
	await db.insert(posts).values({
		content: params.content,
		imageBase64: params.imageBase64,
	});

	revalidatePath("/zenki");
}
