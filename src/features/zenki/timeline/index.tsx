import { Card, Container, Flex, Stack, Text } from "@mantine/core";
import AddButton from "../add/add-button";
import { getAllPosts } from "./data";

export async function AllTimeLine() {
	const posts = await getAllPosts();

	return (
		<Container>
			<AddButton />
			<Flex wrap="wrap" justify="start" gap="sm" py={10}>
				{posts.map((post) => (
					<div key={post.id}>
						<Card shadow="sm" padding="lg" radius="md" withBorder w={300}>
							<Stack gap="xs">
								{post.imageBase64 && (
									<img
										src={`data:image/jpeg;base64,${post.imageBase64}`}
										alt=""
										height={150}
										width={300}
									/>
								)}
								<Text
									style={{
										wordBreak: "break-all",
									}}
								>
									{post.content}
								</Text>
								<Text size="sm" color="gray">
									{post.createdAt ? post.createdAt.toLocaleDateString() : ""}
								</Text>
							</Stack>
						</Card>
					</div>
				))}
			</Flex>
			<AddButton />
		</Container>
	);
}
