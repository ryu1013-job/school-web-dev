"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import AddForm from "./add-form";

export default function AddButton() {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal opened={opened} onClose={close} title="Add Post">
				<AddForm close={close} />
			</Modal>
			<Button color="blue" onClick={open}>
				<IconPlus size={16} style={{ marginRight: 5 }} />
				<span>Add</span>
			</Button>
		</>
	);
}
