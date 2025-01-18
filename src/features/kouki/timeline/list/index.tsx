import { Flex } from "@mantine/core";
import TimelineItem from "../item";
import type { TimelineItem as ItemType } from "../types";

export default function TimelineList({ items }: { items: ItemType[] }) {
	return (
		<Flex wrap="wrap" justify="center" gap="sm" py={10}>
			{items.map((item) => (
				<TimelineItem key={item.postId} item={item} />
			))}
		</Flex>
	);
}
