import { and, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db/drizzle";
import { follows, user } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function getUsers() {
	// セッション取得
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	// ログインしていない場合は、とりあえず全ユーザー一覧をフォロー状態 false で返す
	// （ビジネスロジックに応じて未ログインなら空配列にするなど調整してください）
	if (!session) {
		const allUsersNoSession = await db
			.select({
				userId: user.id,
				name: user.name,
				email: user.email,
				image: user.image,
				isFollowing: sql<boolean>`FALSE`.as("isFollowing"), // ログインしていないなら全員フォローしていない扱い
			})
			.from(user);

		return allUsersNoSession;
	}

	// ログイン中ユーザーID
	const loggedInUserId = session.user.id;

	// 全ユーザー + 「ログイン中ユーザーがフォローしているか」 を取得
	const allUsers = await db
		.select({
			userId: user.id,
			name: user.name,
			email: user.email,
			image: user.image,
			// CASE WHEN で、follows のレコードがマッチすれば true、なければ false
			isFollowing: sql<boolean>`
        CASE 
          WHEN ${follows.followerId} IS NOT NULL THEN TRUE
          ELSE FALSE
        END
      `.as("isFollowing"),
		})
		.from(user)
		// 左結合し、ログイン中ユーザーがこのユーザーをフォローしているかどうかをチェック
		.leftJoin(
			follows,
			and(
				eq(follows.followerId, loggedInUserId), // フォローしている人 = ログイン中ユーザー
				eq(follows.followeeId, user.id), // フォローされている人 = userテーブルのid
			),
		);

	return allUsers.filter((user) => user.userId !== loggedInUserId);
}
