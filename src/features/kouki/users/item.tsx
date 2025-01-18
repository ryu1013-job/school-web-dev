"use client";

import { Avatar, Button, Card, Flex, Stack } from "@mantine/core";
import React, { useActionState } from "react";
import { handleFollow, handleUnfollow } from "./action";

type Props = {
	userId: string;
	name: string;
	email: string;
	image: string | null;
	isFollowing: boolean;
};

export default function UserItem(user: Props) {
	const [_u, unFollow, isUnFollowPending] = useActionState(
		handleUnfollow,
		undefined,
	);
	const [_s, follow, isFollowPending] = useActionState(handleFollow, undefined);

	const isFollowing = user.isFollowing;

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Stack>
				<Avatar src={user.image} alt={user.name} />
				<div>{user.name}</div>
				<div>{user.email}</div>
				{isUnFollowPending || isFollowPending ? (
					<div>Loading...</div>
				) : (
					<form>
						<input type="hidden" name="userId" value={user.userId} />
						{isFollowing ? (
							<Button type="submit" formAction={unFollow} color="red">
								Unfollow
							</Button>
						) : (
							<Button color="blue" type="submit" formAction={follow}>
								Follow
							</Button>
						)}
					</form>
				)}
			</Stack>
		</Card>
	);
}
