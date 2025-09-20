export type CategoryViewModel = {
	id: number;
	name: string;
	specs: { id: number; name: string }[];
};

export type CategoriesViewModel = CategoryViewModel[];
