import { Stack } from "@mantine/core";
import { Suspense } from "react";
import Session from "~/features/kouki/auth/session";
import SignOutButton from "~/features/kouki/auth/sign-out-button";
import BackButton from "~/features/kouki/common/back-button";

export default function Settings() {
	return (
		<Stack>
			<SignOutButton />
			<Suspense fallback={<div>Loading...</div>}>
				<Session />
			</Suspense>
		</Stack>
	);
}
