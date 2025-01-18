import { Suspense } from "react";
import UserList from "~/features/kouki/users";

export default function Users() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UserList />
		</Suspense>
	);
}
