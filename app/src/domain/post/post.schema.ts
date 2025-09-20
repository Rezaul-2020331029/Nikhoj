import { z } from "zod";

export const CreatePostRequestSchema = z.object({
	title: z.string().min(1, { message: "Post title is required" }),
	description: z.string().min(1, { message: "Post description is required" }),
	category: z.string().min(1, { message: "Post category is required" }),
	postType: z.enum(["lost", "found"], { message: "Invalid post type" }),
	threadId: z.string().nullable(),
	files: z.array(z.string({ message: "File must be base64 encoded" })).min(1, { message: "Post image is required" }),
	postSpecs: z.record(
		z.string().min(1, { message: "Spec key is required" }),
		z.union([
			z.string().min(1, { message: "Spec value is required" }),
			z.number({ message: "Spec value is required" }).positive({ message: "Spec value must be positive" }),
		])
	),
	contactNumber: z.string().regex(/^(?:\+?8801|01)[3-9]\d{2}-?\d{3}-?\d{3}$/, {
		message:
			"Invalid Bangladeshi phone number. Must start with 01 or +8801, followed by 9 digits. Hyphens are optional.",
	}),
	district: z.string().min(1, { message: "District is required" }),
	city: z.string().min(1, { message: "City is required" }),
	subDistrict: z.string().min(1, { message: "Sub-district is required" }),
	postOffice: z.string().min(1, { message: "Post office is required" }),
	roadAddress: z.string().min(1, { message: "Road address is required" }),
});

// Get Request schema
export const PaginatedPostsRequestSchema = z.object({
	search: z.string().nullable(),
	type: z.enum(["LOST", "FOUND"], { message: "Post type is required" }), // assuming FOUND also possible
	date: z.string({ message: "Post date is required" }).nullable(), // ISO date string
	category: z.string().nullable(),
	threadId: z.number({ message: "Invalid threadId. Expected number" }).nullable(),
	district: z.string().nullable(),
	page: z.number({ message: "Page is required" }).int().min(0),
	limit: z.number({ message: "Limit is required" }).int().min(1),
});

// Get Response schema

// Schema for imageUrls array items
const ImageUrlSchema = z.object({
	id: z.number({ message: "Invalid image id or missing" }),
	url: z.url({ message: "Invalid image url or missing" }),
});

// Schema for postSpecs array items
const PostSpecSchema = z.object({
	id: z.number({ message: "Invalid spec id or missing" }),
	name: z.string().min(1, { message: "Invalid spec name or missing" }),
	value: z.string().min(1, { message: "Invalid spec value id or missing" }),
});

// Schema for sort object
const SortSchema = z.object({
	empty: z.boolean(),
	sorted: z.boolean(),
	unsorted: z.boolean(),
});

// Schema for pageable object
const PageableSchema = z.object({
	pageNumber: z.number({ message: "Invalid page number or missing" }),
	pageSize: z.number({ message: "Invalid page size or missing" }),
	sort: SortSchema,
	offset: z.number({ message: "Invalid page offset or missing" }),
	paged: z.boolean(),
	unpaged: z.boolean(),
});

// Schema for individual post in content array
export const GetPostResponseSchema = z.object({
	postId: z.uuid({ message: "Invalid post id or missing" }),
	posterId: z.uuid({ message: "Invalid poster id or missing" }),
	contactNumber: z.string().min(1, { message: "Invalid post type or missing" }),
	title: z.string().min(1, { message: "Invalid post title or missing" }),
	postType: z.enum(["LOST", "FOUND"], { message: "Invalid post type or missing" }),
	description: z.string().min(1, { message: "Invalid post description or missing" }),
	reports: z.array(z.unknown()).default([]).nullable().optional(),
	imageUrls: z.array(ImageUrlSchema),
	postSpecs: z.array(PostSpecSchema),
	category: z.string().min(1, { message: "Invalid post category or missing" }),
	district: z.string().min(1, { message: "Invalid post district or missing" }),
	city: z.string().min(1, { message: "Invalid post city or missing" }),
	subDistrict: z.string().min(1, { message: "Invalid post subdistrict or missing" }),
	postOffice: z.string().min(1, { message: "Invalid post postOffice or missing" }),
	roadAddress: z.string().min(1, { message: "Invalid post roadAddress or missing" }),
	address: z.string().min(1, { message: "Invalid post address or missing" }),
	created: z.string().min(1, { message: "Post create time is missing" }),
	updated: z.string().min(1, { message: "Post update time is missing" }),
	status: z.enum(["ONGOING", "RESOLVED"], { message: "Invalid post status or missing" }),
});

export const GetPostsResponseSchema = z.array(GetPostResponseSchema);

export const GetPaginatedPostResponseSchema = z.object({
	content: z.array(GetPostResponseSchema),
	pageable: PageableSchema,
	last: z.boolean({ message: "Invalid last in pagable or missing" }),
	totalElements: z.number({ message: "Invalid totalElements in pagable or missing" }),
	totalPages: z.number({ message: "Invalid last in pagable or missing" }),
	size: z.number({ message: "Invalid totalPages in pagable or missing" }),
	number: z.number({ message: "Invalid number in pagable or missing" }),
	first: z.boolean({ message: "Invalid first in pagable or missing" }),
	numberOfElements: z.number({ message: "Invalid numberOfElements in pagable or missing" }),
	sort: SortSchema,
	empty: z.boolean({ message: "Invalid empty in pagable or missing" }),
});

export const AdvancedSearchPostRequestSchema = z.object({
	postType: z.enum(["lost", "found"], { message: "Invalid post type" }),
	category: z.string().min(1, { message: "Post category is required" }),
	postSpecs: z
		.record(
			z.string().min(1, { message: "Spec key is required" }),
			z.union([
				z.string().nullable().optional(),
				z.number().nonnegative({ message: "Spec value must be positive" }).nullable().optional(),
			])
		)
		.refine((val) => Object.keys(val).length > 0, {
			message: "At least one spec is required",
		}),
	page: z.number({ message: "Page is required" }).int().min(0),
	size: z.number({ message: "Limit is required" }).int().min(1),
});

export const GetSimilarPostsRequestSchema = z.object({
	postId: z.uuid({ message: "Post id is required" }),
});

export const DeletePostSchema = z.object({
	postId: z.uuid({ message: "Post id is required" }),
});
