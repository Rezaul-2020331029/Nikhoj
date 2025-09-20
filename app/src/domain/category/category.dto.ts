import type z from "zod";
import type {
	CategoriesResponseSchema,
	CategoryResponseSchema,
	SpecificationSchema,
} from "@/domain/category/category.schema";

export type CategoryResponseDto = z.infer<typeof CategoryResponseSchema>;
export type SpecificationResponseDto = z.infer<typeof SpecificationSchema>;
export type CategoriesResponseDto = z.infer<typeof CategoriesResponseSchema>;
