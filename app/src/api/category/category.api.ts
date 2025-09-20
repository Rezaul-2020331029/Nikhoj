import { api } from "@/api/api.client";
import { responseParser } from "@/api/response.parser";
import type { CategoriesResponseDto } from "@/domain/category/category.dto";
import { CategoriesResponseSchema } from "@/domain/category/category.schema";
import { categories } from "@/shared/utils/categories";

export class CategoryApi {
	static async getCategories(): Promise<CategoriesResponseDto> {
		const response = await api.get<CategoriesResponseDto>("/guest/category/");

		const parsed = responseParser(CategoriesResponseSchema, response);

		return parsed;
	}

	static async getDummyCategories() {
		return categories;
	}
}
