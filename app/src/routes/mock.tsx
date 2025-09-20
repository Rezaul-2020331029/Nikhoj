import { MessageEmptyUI } from "@/presentation/message/message-empty.ui";
import { AdvancedSearchPostsEmptyUI } from "@/presentation/post/advanced-posts-search-empty.ui";
import { PostsEmptyUI } from "@/presentation/post/posts-empty.ui";
import { PostsSearchEmptyUI } from "@/presentation/post/posts-search-empty.ui";
import { AppLayout } from "@/shared/layout/app.layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mock")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MockPosts />;
}

export function MockPosts() {
	return (
		<AppLayout
			Left={
				<AppLayout.Main
					children={
						// <PostsEmptyUI />
						<AdvancedSearchPostsEmptyUI />
					}
				/>
			}
			Main={<AppLayout.Main children={<PostsSearchEmptyUI />} />}
			Right={<AppLayout.Right children={<MessageEmptyUI />} />}
		/>
	);
}
