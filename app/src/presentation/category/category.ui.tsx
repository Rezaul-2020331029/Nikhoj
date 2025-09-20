import { useDummyCategories } from "@/hooks/use-category.hook";
import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";
import { AppButton } from "@/shared/ui/button/app-button";
import { AppRadio } from "@/shared/ui/app-radio";
import { AppTitle } from "@/shared/ui/app-title";
import { toStringOrThrow } from "@/shared/utils/to-string";
import { useSearch } from "@tanstack/react-router";

export function CategoryUI() {
	const { category } = useSearch({ from: "/_auth/home" });
	const { tab } = useSearch({ from: "/_auth/home" });
	const setHomeRoute = useSetHomeRoute();

	const { data: categories } = useDummyCategories();

	const handleCategoryChange = (category: string) => {
		setHomeRoute({ category, tab });
	};

	return (
		<article className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<AppTitle title="Categories" />
				<AppButton
					variant="outline"
					onClick={() => {
						setHomeRoute({ category: "", tab });
					}}
				>
					Clear
				</AppButton>
			</div>
			<AppRadio
				value={category}
				radioButtons={categories.map((c) => c.name)}
				onRadioChange={(val) => {
					handleCategoryChange(toStringOrThrow(val));
				}}
			/>
		</article>
	);
}
