"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

export const signIn = async () => {
	await auth.api.signInSocial({
		headers: await headers(),
		body: {
			provider: "github",
		},
	});

	redirect("/kouki");
};

export const signOut = async () => {
	await auth.api.signOut({
		headers: await headers(),
	});

	redirect("/kouki/auth");
};
