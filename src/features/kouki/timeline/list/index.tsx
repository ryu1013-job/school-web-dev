import { Flex, SimpleGrid } from "@mantine/core";
import TimelineItem from "../item";

export default function TimelineList() {
	return (
		<Flex wrap="wrap" justify="center" gap="sm" py={10}>
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
			<TimelineItem />
		</Flex>
	);
}
