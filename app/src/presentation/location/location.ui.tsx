import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";
import { AppSearchSelect } from "@/shared/ui/search/app-search-select";
import { AppTitle } from "@/shared/ui/app-title";
import { districts } from "@/shared/utils/districts";
import { useSearch } from "@tanstack/react-router";

export function LocationUI() {
	const { location, tab } = useSearch({ from: "/_auth/home" });
	const setHomeRoute = useSetHomeRoute();

	const handleLocationChange = (location: string) => {
		setHomeRoute({ location, tab });
	};
	return (
		<article className="flex justify-between items-center">
			<AppTitle title="Location" />
			<AppSearchSelect
				selectors={districts.map((d) => d.name)}
				title="Location"
				onSelectChange={handleLocationChange}
				defaultValue={location}
			/>
		</article>
	);
}
