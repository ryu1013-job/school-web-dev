import { Suspense } from "react";
import AddForm from "~/features/kouki/add";

export default function Add() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AddForm />
		</Suspense>
	);
}
