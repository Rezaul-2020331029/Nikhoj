import { useRouter, useSearch } from "@tanstack/react-router";

type HomeRouteProps = {
	tab: "lost" | "found" | "search" | "create" | "message" | "menu";
	search?: string;
	date?: string;
	category?: string;
	location?: string;
	threadId?: string;
};

export function useSetHomeRoute() {
	const router = useRouter();
	const { date, category, location, threadId } = useSearch({ from: "/_auth/home" });

	return (next: HomeRouteProps) => {
		router.navigate({
			to: "/home",
			search: {
				tab: next.tab,
				search: next.search,
				date: next.date === "" ? undefined : (next.date ?? date),
				category: next.category === "" ? undefined : (next.category ?? category),
				location: next.location === "" ? undefined : (next.location ?? location),
				threadId: next.threadId === "" ? undefined : (next.threadId ?? threadId),
			},
		});
	};
}
