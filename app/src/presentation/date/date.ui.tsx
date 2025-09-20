import { useSetHomeRoute } from "@/shared/hooks/use-set-home-route";
import { AppDatePicker } from "@/shared/ui/app-date-picker";
import { AppTitle } from "@/shared/ui/app-title";
import { toDateOrThrow } from "@/shared/utils/to-date";
import { useSearch } from "@tanstack/react-router";

export function DateUI() {
	const { date, tab } = useSearch({ from: "/_auth/home" });

	const setHomeRoute = useSetHomeRoute();

	const handleDateChange = (date?: Date) => {
		setHomeRoute({ date: date ? date.toUrlParam() : "", tab });
	};

	return (
		<article className="flex items-center justify-between">
			<AppTitle title="Date" />
			<AppDatePicker date={date ? toDateOrThrow(date) : undefined} onDateChange={handleDateChange} />
		</article>
	);
}
