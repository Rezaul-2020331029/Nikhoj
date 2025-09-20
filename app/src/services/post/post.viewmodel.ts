export type PostSpecViewModel = {
	id: number;
	name: string;
	value: string;
};

export type ImageUrlViewModel = {
	id: number;
	url: string;
};

export type PostViewModel = {
	id: string; // postId (cuid)
	posterId: string; // For linking to user profile, if needed
	contactNumber: string;
	title: string;
	postType: "LOST" | "FOUND";
	description: string;
	imageUrls: ImageUrlViewModel[];
	specs: PostSpecViewModel[];
	category: string;
	district: string;
	city: string;
	subDistrict: string;
	postOffice: string;
	roadAddress: string;
	address: string;
	created: string; // ISO datetime string for display
	updated: string; // ISO datetime string for display
	status: "ONGOING" | "RESOLVED";
};

export type PostsViewModel = PostViewModel[];

export type PaginatedPostsViewModel = {
	posts: PostViewModel[];
	page: number; // Current page number
	pageSize: number; // Number of posts per page
	totalElements: number; // Total number of posts
	totalPages: number; // Total number of pages
	isLast: boolean; // Whether this is the last page
	isFirst: boolean; // Whether this is the first page
};
