import { Suspense } from "react";
import { AllTimeLine } from "~/features/kouki/timeline";

export default function All() {
	return (
		<Suspense fallback="Loading...">
			<AllTimeLine />
		</Suspense>
	);
}
