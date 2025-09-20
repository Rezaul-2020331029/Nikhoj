import { useGetSimilarPosts } from "@/hooks/use-post.hook";
import { MessageUI } from "@/presentation/message/message.ui";
import { Post } from "@/presentation/post/post.ui";
import { AppLayout } from "@/shared/layout/app.layout";
import { usePostStore } from "@/store/use-post.store";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/similarity/$postId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { postId } = useParams({ from: "/_auth/similarity/$postId" });
	const { data: posts } = useGetSimilarPosts({ postId });
	const { post } = usePostStore();

	if (!post) throw new Error(`Post with id ${postId} is not found`);

	return (
		<section className="h-screen">
			<AppLayout
				className="h-[calc(100vh)]"
				Left={
					<AppLayout.Left className="p-0">
						<Post
							className="bg-transparent shadow-none border-none rounded-none hover:shadow-none"
							Post={post}
							Image={<Post.Image />}
							Title={<Post.Title />}
							Type={<Post.Type />}
							Category={<Post.Category />}
							Contact={<Post.Contact />}
							Address={<Post.Address />}
							CategorySpecs={<Post.CategorySpecs />}
							Description={<Post.Description />}
							shouldShowDetails
						/>
					</AppLayout.Left>
				}
				Main={<AppLayout.Main posts={posts}></AppLayout.Main>}
				Right={
					<AppLayout.Right>
						<MessageUI />
					</AppLayout.Right>
				}
			/>
		</section>
	);
}
