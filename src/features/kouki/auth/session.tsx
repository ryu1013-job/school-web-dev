import { headers } from "next/headers";
import { auth } from "~/lib/auth";

export default async function Session() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return <div>Not authenticated</div>;
	}
	return <div>{JSON.stringify(session.user)}</div>;
}
