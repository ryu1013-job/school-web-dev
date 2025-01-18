import { Avatar, Card, Flex, Stack, Text } from "@mantine/core";
import { getPostImage } from "../data";
import type { TimelineItem as ItemType } from "../types";

export default async function TimelineItem({ item }: { item: ItemType }) {
	const base64image = await getPostImage({ postId: item.postId });

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder w={300}>
			<Stack gap="xs">
				{item.imageUrl && (
					<img src={item.imageUrl} alt="" height={150} width={300} />
				)}
				{base64image && (
					<img
						src={`data:image/jpeg;base64,${base64image}`}
						alt=""
						height={150}
						width={300}
					/>
				)}
				<Text>{item.content}</Text>
				<Flex justify="space-between">
					<Avatar size="sm" src={item.profileImage} />
					<Text size="sm">{item.createdAt?.toLocaleDateString()}</Text>
				</Flex>
			</Stack>
		</Card>
	);
}
