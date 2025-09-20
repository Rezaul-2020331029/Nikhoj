import { z } from "zod";

export const SpecificationSchema = z.object({
	id: z.number().int().positive(),
	name: z.string().min(1, { message: "Specification name is missing" }),
});

export const CategoryResponseSchema = z.object({
	id: z.number().int().positive(),
	name: z.string().min(1, { message: "Category name is missing" }),
	specifications: z.array(SpecificationSchema),
});

export const CategoriesResponseSchema = z.array(CategoryResponseSchema);
