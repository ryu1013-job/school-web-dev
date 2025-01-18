"use client";

import { Center, Tabs } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function HeaderTab() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Center>
			<Tabs
				defaultValue="/kouki"
				value={pathname}
				onChange={(value) => router.push(value as string)}
			>
				<Tabs.List>
					<Tabs.Tab value="/kouki">All</Tabs.Tab>
					<Tabs.Tab value="/kouki/follow">Follow</Tabs.Tab>
					<Tabs.Tab value="/kouki/add">Add</Tabs.Tab>
					<Tabs.Tab value="/kouki/users">Users</Tabs.Tab>
					<Tabs.Tab value="/kouki/settings">Settings</Tabs.Tab>
				</Tabs.List>
			</Tabs>
		</Center>
	);
}
