import type { GetPaginatedPostsResponseDto, GetPostResponseDto, GetPostsResponseDto } from "@/domain/post/post.dto";
import type { PaginatedPostsViewModel, PostsViewModel, PostViewModel } from "@/services/post/post.viewmodel";

export function mapPostDtoToVm(dto: GetPostResponseDto): PostViewModel {
	return {
		id: dto.postId,
		posterId: dto.posterId,
		contactNumber: dto.contactNumber,
		title: dto.title,
		postType: dto.postType,
		description: dto.description,
		imageUrls: dto.imageUrls.map((img) => ({
			id: img.id,
			url: img.url,
		})),
		specs: dto.postSpecs.map((spec) => ({
			id: spec.id,
			name: spec.name,
			value: spec.value,
		})),
		category: dto.category,
		district: dto.district,
		city: dto.city,
		subDistrict: dto.subDistrict,
		postOffice: dto.postOffice,
		roadAddress: dto.roadAddress,
		address: dto.address,
		created: dto.created,
		updated: dto.updated,
		status: dto.status,
	};
}

export function mapPaginatedPostsDtoToVm(dto: GetPaginatedPostsResponseDto): PaginatedPostsViewModel {
	return {
		posts: dto.content.map(mapPostDtoToVm),
		page: dto.pageable.pageNumber,
		pageSize: dto.pageable.pageSize,
		totalElements: dto.totalElements,
		totalPages: dto.totalPages,
		isLast: dto.last,
		isFirst: dto.first,
	};
}

export function mapPostsDtoToVm(dto: GetPostsResponseDto): PostsViewModel {
	return dto.map(mapPostDtoToVm);
}
