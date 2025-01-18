"use server";

import { and, desc, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "~/db/drizzle";
import { follows, posts, user } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function getAllPosts() {
	const allPosts = await db
		.select({
			postId: posts.id,
			content: posts.content,
			imageUrl: posts.imageUrl,
			createdAt: posts.createdAt,
			username: user.name,
			profileImage: user.image,
		})
		.from(posts)
		.leftJoin(user, eq(user.id, posts.userId))
		.orderBy(desc(posts.createdAt));

	return allPosts;
}

export async function getFollowedPosts() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/kouki/auth");
	}

	const loggedInUserId = session.user.id;

	const followedPosts = await db
		.select({
			postId: posts.id,
			content: posts.content,
			imageUrl: posts.imageUrl,
			createdAt: posts.createdAt,
			username: user.name,
			profileImage: user.image,
		})
		.from(posts)
		.leftJoin(user, eq(user.id, posts.userId))
		.innerJoin(
			follows,
			and(
				eq(follows.followerId, loggedInUserId),
				eq(follows.followeeId, user.id),
			),
		)
		.orderBy(desc(posts.createdAt));

	return followedPosts;
}

export async function getPostImage({ postId }: { postId: string }) {
	const post = await db
		.select({
			imageBase64: posts.imageBase64,
		})
		.from(posts)
		.where(eq(posts.id, postId));

	return post[0].imageBase64;
}
