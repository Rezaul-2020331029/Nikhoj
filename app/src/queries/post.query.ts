import type { GetSimilarPostsRequestDto } from "@/domain/post/post.dto";
import { PostService } from "@/services/post/post.service";
import type { PostViewModel } from "@/services/post/post.viewmodel";
import { queryClient } from "@/shared/client/query.client";
import { createQueryOptions } from "@/shared/query";

export function storePost(dto: PostViewModel) {
	queryClient.setQueryData(["similarity-post"] as const, dto);
}

export function getPost(): PostViewModel | undefined {
	return queryClient.getQueryData(["similarity-post"] as const);
}

export async function getSimilarPosts(dto: GetSimilarPostsRequestDto) {
	return queryClient.fetchQuery(
		createQueryOptions({
			queryKey: ["post", dto.postId] as const,
			queryFn: () => PostService.searchSimilarPosts(dto),
			options: {
				staleTime: Infinity,
			},
		})
	);
}
