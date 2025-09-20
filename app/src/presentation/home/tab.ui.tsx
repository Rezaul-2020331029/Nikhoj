import { useAdvancedSearchMutation, useGetPaginatedPosts } from "@/hooks/use-post.hook";
import { CategoryUI } from "@/presentation/category/category.ui";
import { DateUI } from "@/presentation/date/date.ui";
import { LoadingUI } from "@/presentation/loading/loading.ui";
import { LocationUI } from "@/presentation/location/location.ui";
import { MessageUI } from "@/presentation/message/message.ui";
import { AdvancedSearchPostsEmptyUI } from "@/presentation/post/advanced-posts-search-empty.ui";
import { AdvancedPostsSearchFormUI } from "@/presentation/post/advanced-posts-search-form.ui";
import { PostFormUI } from "@/presentation/post/post-form.ui";
import { PostsEmptyUI } from "@/presentation/post/posts-empty.ui";
import { PostsSearchEmptyUI } from "@/presentation/post/posts-search-empty.ui";
import { ThreadUI } from "@/presentation/thread/thread.ui";
import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";
import { AppLayout } from "@/shared/layout/app.layout";
import { AppSearch } from "@/shared/ui/search/app-search";
import { useSearch } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

const node = {
	lost: <LostAndFoundTabUI />,
	found: <LostAndFoundTabUI />,
	search: <AdvancedSearchTabUI />,
	create: <CreateTabUI />,
	message: <p>Message UI</p>,
	menu: <p>Menu UI</p>,
};

export function TabUI() {
	const { tab } = useSearch({ from: "/_auth/home" });

	return <Suspense fallback={<LoadingUI />}>{node[tab]}</Suspense>;
}

function LostAndFoundTabUI() {
	const { tab, date, category, threadId, location, search } = useSearch({ from: "/_auth/home" });
	const setHomeRoute = useSetHomeRoute();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetPaginatedPosts({
		search: search ?? null,
		type: tab.toUpperCase() as "LOST" | "FOUND",
		date: date ?? null,
		category: category ?? null,
		threadId: threadId ? Number(threadId) : null,
		district: location ?? null,
		limit: 50,
	});

	const posts = data?.pages.flatMap((page) => page.posts) ?? [];

	const EmptyPosts = search ? <PostsSearchEmptyUI /> : <PostsEmptyUI />;

	return (
		<AppLayout
			Left={
				<AppLayout.Left className="flex flex-col gap-12">
					<DateUI />
					<LocationUI />
					<CategoryUI />
					<ThreadUI />
				</AppLayout.Left>
			}
			Main={
				posts.length > 0 ?
					<AppLayout.Main
						posts={posts}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
						isFetchingNextPage={isFetchingNextPage}
						className="flex flex-col gap-6"
					>
						<AppSearch
							placeholder="Search posts..."
							onSearch={(value) => {
								setHomeRoute({
									tab,
									search: value,
									date: "",
									category: "",
									threadId: "",
								});
							}}
						/>
					</AppLayout.Main>
				:	EmptyPosts
			}
			Right={
				<AppLayout.Right className="flex items-center justify-center bg-accent text-muted-foreground text-3xl text-semibold">
					<MessageUI />
				</AppLayout.Right>
			}
		/>
	);
}

function CreateTabUI() {
	return (
		<AppLayout
			Main={
				<AppLayout.Main className="col-span-2">
					<PostFormUI />
				</AppLayout.Main>
			}
			Right={
				<AppLayout.Right className="flex items-center justify-center bg-accent text-muted-foreground text-3xl text-semibold">
					<MessageUI />
				</AppLayout.Right>
			}
		/>
	);
}

function AdvancedSearchTabUI() {
	const { mutateAsync, data, isSuccess } = useAdvancedSearchMutation();

	useEffect(() => {}, [isSuccess]);

	const posts = data?.posts;

	return (
		<AppLayout
			Left={
				<AppLayout.Left>
					<AdvancedPostsSearchFormUI mutateAsync={mutateAsync} />
				</AppLayout.Left>
			}
			Main={
				posts ?
					<AppLayout.Main className="overflow-y-auto" posts={posts} />
				:	<AppLayout.Main>
						<AdvancedSearchPostsEmptyUI />
					</AppLayout.Main>
			}
			Right={
				<AppLayout.Right className="flex items-center justify-center bg-accent text-muted-foreground text-3xl text-semibold">
					<MessageUI />
				</AppLayout.Right>
			}
		/>
	);
}
