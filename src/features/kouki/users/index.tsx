import { Flex } from "@mantine/core";
import React from "react";
import { getUsers } from "./data";
import UserItem from "./item";

export default async function UserList() {
	const users = await getUsers();

	return (
		<Flex wrap="wrap" gap="sm" py={10}>
			{users.map((user) => (
				<UserItem key={user.userId} {...user} />
			))}
		</Flex>
	);
}
