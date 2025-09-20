import { Post } from "@/presentation/post/post.ui";
import type { PostsViewModel } from "@/services/post/post.viewmodel";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

type PostsProps = {
	posts: PostsViewModel;
	scrollRef: React.RefObject<HTMLElement | null>;
	hasNextPage?: boolean;
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
};

export function Posts({ posts, scrollRef, hasNextPage, fetchNextPage, isFetchingNextPage }: PostsProps) {
	const virtualizer = useVirtualizer({
		count: posts.length,
		estimateSize: () => 700,
		measureElement: (el) => {
			if (!el) return 0;
			const height = el.getBoundingClientRect().height;
			return height;
		},
		getScrollElement: () => scrollRef.current,
		overscan: 5,
	});

	useEffect(() => {
		const handleScroll = () => {
			if (!scrollRef.current || !hasNextPage || isFetchingNextPage) return;

			const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
			const isNearBottom = scrollHeight - scrollTop - clientHeight < 200; // Trigger 200px from bottom

			if (isNearBottom && fetchNextPage) {
				fetchNextPage();
			}
		};

		const scrollElement = scrollRef.current;
		scrollElement?.addEventListener("scroll", handleScroll);

		return () => {
			scrollElement?.removeEventListener("scroll", handleScroll);
		};
	}, [scrollRef, hasNextPage, fetchNextPage, isFetchingNextPage]);

	const virtualItems = virtualizer.getVirtualItems();

	return (
		<div
			className="relative w-full flex flex-col gap-6"
			style={{
				height: virtualizer.getTotalSize(),
				minHeight: "100%",
			}}
		>
			{virtualItems.map((virtualRow) => {
				const post = posts[virtualRow.index];
				return (
					<div
						key={post.id}
						data-index={virtualRow.index}
						ref={(node) => virtualizer.measureElement(node)}
						className="absolute top-0 left-0 w-full mb-4"
						style={{
							transform: `translateY(${virtualRow.start}px)`,
						}}
					>
						<div className="pb-4">
							<Post
								Post={post}
								Image={<Post.Image />}
								Title={<Post.Title />}
								Type={<Post.Type />}
								Category={<Post.Category />}
								Contact={<Post.Contact />}
								Address={<Post.Address />}
								CategorySpecs={<Post.CategorySpecs />}
								Description={<Post.Description />}
								Footer={<Post.Footer />}
							/>
						</div>
					</div>
				);
			})}
			{isFetchingNextPage && (
				<div className="text-center py-4">
					<span className="text-slate-500">Loading more posts...</span>
				</div>
			)}
		</div>
	);
}
