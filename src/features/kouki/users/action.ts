"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "~/db/drizzle";
import { follows } from "~/db/schema";
import { auth } from "~/lib/auth";

export const handleFollow = async (_state: unknown, formData: FormData) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return;
	}

	const userId = formData.get("userId");

	if (!userId) {
		return;
	}

	const loggedInUserId = session.user.id;

	await db.insert(follows).values({
		followerId: loggedInUserId,
		followeeId: userId as string,
	});

	revalidatePath("/kouki");
};

export const handleUnfollow = async (_state: unknown, formData: FormData) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return;
	}

	const loggedInUserId = session.user.id;

	const userId = formData.get("userId");

	if (!userId) {
		return;
	}

	await db
		.delete(follows)
		.where(
			and(
				eq(follows.followerId, loggedInUserId),
				eq(follows.followeeId, userId as string),
			),
		);

	revalidatePath("/kouki");
};
