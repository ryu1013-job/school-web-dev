import { Avatar, Card, Flex, Image, Stack, Text } from "@mantine/core";

export default function TimelineItem() {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder w={300}>
			<Stack gap="xs">
				<Image
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
					alt="Norway Fjord Adventures"
					h={150}
					w={300}
				/>
				<Text>Content</Text>
				<Flex justify="space-between">
					<Avatar
						size="sm"
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/avatar-1.jpg"
					/>
					<Text size="sm">2025/01/01</Text>
				</Flex>
			</Stack>
		</Card>
	);
}
