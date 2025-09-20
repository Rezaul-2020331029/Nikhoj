import { CategoryApi } from "@/api/category/category.api";
import { mapCategoriesDtoToVm } from "@/services/category/category.mapper";
import type { CategoriesViewModel } from "@/services/category/category.viewmodel";

export class CategoryService {
	static async getCategories(): Promise<CategoriesViewModel> {
		const categories = await CategoryApi.getCategories();

		return mapCategoriesDtoToVm(categories);
	}

	static async getDummyCategories() {
		return CategoryApi.getDummyCategories();
	}
}
