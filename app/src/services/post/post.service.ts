import { PostApi } from "@/api/post/post.api";
import type {
	CreatePostRequestDto,
	GetPaginatedPostsRequestDto,
	AdvancedSearchPostRequestDto,
	GetSimilarPostsRequestDto,
	DeletePostDto,
} from "@/domain/post/post.dto";
import { mapPaginatedPostsDtoToVm, mapPostsDtoToVm } from "@/services/post/post.mapper";
import type { PaginatedPostsViewModel, PostsViewModel } from "@/services/post/post.viewmodel";

export class PostService {
	static async createPost(dto: CreatePostRequestDto) {
		return await PostApi.createPost(dto);
	}

	static async getPaginatedPosts(dto: GetPaginatedPostsRequestDto): Promise<PaginatedPostsViewModel> {
		const posts = await PostApi.getPaginatedPosts(dto);

		return mapPaginatedPostsDtoToVm(posts);
	}

	static async searchAdvancedPosts(dto: AdvancedSearchPostRequestDto): Promise<PaginatedPostsViewModel> {
		const posts = await PostApi.searchPosts(dto);

		const res = mapPaginatedPostsDtoToVm(posts);
		console.log("PostService.searchAdvancedPosts:", res);
		return res;
	}

	static async searchSimilarPosts(dto: GetSimilarPostsRequestDto): Promise<PostsViewModel> {
		const posts = await PostApi.searchSimilarPosts(dto);

		return mapPostsDtoToVm(posts);
	}

	static async deletePost(dto: DeletePostDto) {
		await PostApi.deletePost(dto);
	}
}
