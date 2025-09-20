import { api } from "@/api/api.client";
import { responseParser } from "@/api/response.parser";
import type {
	CreatePostRequestDto,
	GetPaginatedPostsRequestDto,
	GetPaginatedPostsResponseDto,
	GetPostsResponseDto,
	AdvancedSearchPostRequestDto,
	GetSimilarPostsRequestDto,
	DeletePostDto,
} from "@/domain/post/post.dto";
import { GetPaginatedPostResponseSchema, GetPostsResponseSchema } from "@/domain/post/post.schema";

export class PostApi {
	static async createPost(dto: CreatePostRequestDto): Promise<void> {
		await api.post<void>("/post/create", dto);
	}

	static async getPaginatedPosts(dto: GetPaginatedPostsRequestDto): Promise<GetPaginatedPostsResponseDto> {
		const response =
			dto.search ?
				await api.post("/guest/post/search", { search: dto.search, type: dto.type, page: dto.page, limit: dto.limit })
			:	await api.post("/guest/post/filter", dto);

		return responseParser(GetPaginatedPostResponseSchema, response);
	}

	static async searchPosts(dto: AdvancedSearchPostRequestDto): Promise<GetPaginatedPostsResponseDto> {
		const response = await api.post("/guest/post/advance-filter", dto);
		return responseParser(GetPaginatedPostResponseSchema, response);
	}

	static async searchSimilarPosts(dto: GetSimilarPostsRequestDto): Promise<GetPostsResponseDto> {
		const response = await api.get(`/guest/post/face-search/${dto.postId}`);
		return responseParser(GetPostsResponseSchema, response);
	}

	static async deletePost(dto: DeletePostDto) {
		await api.delete(`/post/delete/${dto.postId}`);
	}
}
