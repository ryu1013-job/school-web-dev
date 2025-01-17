"use client";

import { Button } from "@mantine/core";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";

export default function SignInButton() {
	const [isPending, setIsPending] = useState(false);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<Button
			color="black"
			onClick={() => {
				setIsPending(true);
				authClient.signIn.social({
					provider: "github",
				});
			}}
		>
			GitHub Login
		</Button>
	);
}
