import { getAllPosts, getFollowedPosts } from "./data";
import TimelineList from "./list";

export async function AllTimeLine() {
	const posts = await getAllPosts();

	return <TimelineList items={posts} />;
}

export async function FollowTimeLine() {
	const posts = await getFollowedPosts();

	return <TimelineList items={posts} />;
}
