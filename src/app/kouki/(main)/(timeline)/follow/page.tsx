import { Suspense } from "react";
import { FollowTimeLine } from "~/features/kouki/timeline";

export default function Follow() {
	return (
		<Suspense fallback="Loading...">
			<FollowTimeLine />
		</Suspense>
	);
}
