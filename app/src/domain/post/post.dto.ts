import type {
	CreatePostRequestSchema,
	GetPostResponseSchema,
	GetPaginatedPostResponseSchema,
	PaginatedPostsRequestSchema,
	AdvancedSearchPostRequestSchema,
	GetPostsResponseSchema,
	GetSimilarPostsRequestSchema,
	DeletePostSchema,
} from "@/domain/post/post.schema";
import type { z } from "zod";

export type CreatePostRequestDto = z.infer<typeof CreatePostRequestSchema>;

export type GetPostResponseDto = z.infer<typeof GetPostResponseSchema>;

export type GetPostsResponseDto = z.infer<typeof GetPostsResponseSchema>;

export type GetPaginatedPostsRequestDto = z.infer<typeof PaginatedPostsRequestSchema>;
export type GetPaginatedPostsResponseDto = z.infer<typeof GetPaginatedPostResponseSchema>;
export type AdvancedSearchPostRequestDto = z.infer<typeof AdvancedSearchPostRequestSchema>;

export type GetSimilarPostsRequestDto = z.infer<typeof GetSimilarPostsRequestSchema>;
export type DeletePostDto = z.infer<typeof DeletePostSchema>;
