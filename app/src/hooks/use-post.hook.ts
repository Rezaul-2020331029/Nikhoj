import { useMutation, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createMutationOptions, createQueryOptions } from "@/shared/query";
import type {
	CreatePostRequestDto,
	GetPaginatedPostsRequestDto,
	AdvancedSearchPostRequestDto,
	GetSimilarPostsRequestDto,
	DeletePostDto,
} from "@/domain/post/post.dto";
import { PostService } from "@/services/post/post.service";
import type { PaginatedPostsViewModel, PostViewModel } from "@/services/post/post.viewmodel";
import { queryClient } from "@/shared/client/query.client";
import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";

function invalidateAllPostQueries() {
	return queryClient.invalidateQueries({
		predicate: (query) => {
			const rootKey = query.queryKey[0];
			return rootKey === "posts" || rootKey === "post";
		},
	});
}

export function useCreatePost() {
	const setHomeRoute = useSetHomeRoute();
	return useMutation(
		createMutationOptions<void, CreatePostRequestDto>({
			mutationFn: PostService.createPost,
			options: {
				onSuccess: async (_, variables) => {
					await invalidateAllPostQueries();
					setHomeRoute({ tab: variables.postType });
				},
			},
		})
	);
}

export function useGetPaginatedPosts(dto: Omit<GetPaginatedPostsRequestDto, "page">) {
	return useSuspenseInfiniteQuery<PaginatedPostsViewModel, Error>({
		queryKey: ["posts", dto.type, dto.date, dto.category, dto.district, dto.threadId, dto.search] as const,
		queryFn: ({ pageParam }) =>
			PostService.getPaginatedPosts({ ...dto, page: pageParam as number }).then((response) => response),
		getNextPageParam: (lastPage) => {
			if (lastPage.isLast || lastPage.posts.length < lastPage.pageSize) {
				return undefined;
			}
			return lastPage.page + 1;
		},
		initialPageParam: 0,
		gcTime: 0,
	});
}

export function useAdvancedSearchMutation() {
	return useMutation(
		createMutationOptions<PaginatedPostsViewModel, AdvancedSearchPostRequestDto>({
			mutationFn: PostService.searchAdvancedPosts,
			options: {
				onSuccess: (data) => {
					console.log("Data in useAdvancedSearchMutation:", data);
				},
			},
		})
	);
}

export function useAdvancedSearchQuery(dto: AdvancedSearchPostRequestDto | null) {
	return useSuspenseInfiniteQuery<PaginatedPostsViewModel | null, Error>({
		queryKey: ["advanced-search"] as const,
		queryFn: async ({ pageParam }) => {
			if (!dto) return null;
			return await PostService.searchAdvancedPosts({ ...dto, page: pageParam as number });
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return;
			if (lastPage.isLast || lastPage.posts.length < lastPage.pageSize) {
				return undefined;
			}
			return lastPage.page + 1;
		},
		initialPageParam: 0,
		gcTime: 0,
	});
}

export function useGetPost(dto: GetSimilarPostsRequestDto) {
	return queryClient.getQueryData<PostViewModel>(["post", dto.postId] as const);
}

export function useGetSimilarPosts(dto: GetSimilarPostsRequestDto) {
	return useSuspenseQuery(
		createQueryOptions({
			queryKey: ["post", dto.postId] as const,
			queryFn: async () => {
				queryClient.invalidateQueries({
					queryKey: ["post", dto.postId] as const,
				});
				return await PostService.searchSimilarPosts(dto);
			},
			options: {
				staleTime: Infinity,
			},
		})
	);
}

export function useDeletePost() {
	return useMutation(
		createMutationOptions<void, DeletePostDto>({
			mutationFn: PostService.deletePost,
			options: {
				onSuccess: async () => {
					await queryClient.refetchQueries({
						predicate: (query) => {
							const rootKey = query.queryKey[0];
							return rootKey === "posts" || rootKey === "post";
						},
					});
				},
			},
		})
	);
}
