import type { CategoriesResponseDto, CategoryResponseDto } from "@/domain/category/category.dto";
import type { CategoriesViewModel, CategoryViewModel } from "@/services/category/category.viewmodel";

function mapCategoryDtoToVm(dto: CategoryResponseDto): CategoryViewModel {
	return {
		id: dto.id,
		name: dto.name,
		specs: dto.specifications,
	};
}

export function mapCategoriesDtoToVm(dto: CategoriesResponseDto): CategoriesViewModel {
	return dto.map(mapCategoryDtoToVm);
}
