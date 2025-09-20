import { NotFoundUI } from "@/presentation/404/not-found.ui";
import { TabUI } from "@/presentation/home/tab.ui";
import { Header } from "@/shared/ui/header/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
	beforeLoad: () => {},
	validateSearch: (search: Record<string, unknown>) => {
		return {
			tab: (search.tab as "lost" | "found" | "search" | "create" | "message" | "menu") ?? "lost",
			date: (search.date as string | undefined) ?? undefined,
			category: (search.category as string | undefined) ?? undefined,
			location: (search.location as string | undefined) ?? undefined,
			threadId: (search.threadId as string | undefined) ?? undefined,
			search: (search.search as string | undefined) ?? undefined,
		};
	},
	component: RouteComponent,
	notFoundComponent: NotFoundUI,
});

function RouteComponent() {
	return (
		<section className="h-screen">
			<Header />
			<TabUI />
		</section>
	);
}
