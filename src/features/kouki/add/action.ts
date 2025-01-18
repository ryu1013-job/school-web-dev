"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/db/drizzle";
import { posts } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function addPost(params: {
	content: string;
	imageBase64: string | null;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return;
	}

	const userId = session.user.id;

	await db.insert(posts).values({
		id: uuidv4(),
		userId,
		content: params.content,
		imageBase64: params.imageBase64,
	});

	revalidatePath("/kouki");
}
