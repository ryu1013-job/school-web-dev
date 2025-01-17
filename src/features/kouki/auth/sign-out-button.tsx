"use client";

import { Button } from "@mantine/core";
import { useActionState } from "react";
import { signOut } from "./action";

export default function SignOutButton() {
	const [_state, formAction, isPending] = useActionState(signOut, undefined);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<form action={formAction}>
			<Button color="black" type="submit">
				Sign Out
			</Button>
		</form>
	);
}
