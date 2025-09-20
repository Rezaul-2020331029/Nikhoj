import { ensureDummyCategories } from "@/hooks/use-category.hook";
import { LoadingUI } from "@/presentation/loading/loading.ui";
import { useAuthStore } from "@/store/use-auth.store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_guest")({
	beforeLoad: () => {
		const { token } = useAuthStore.getState();
		if (token) {
			throw redirect({
				to: "/home",
				search: {
					tab: "lost",
					search: undefined,
					date: undefined,
					category: undefined,
					location: undefined,
					threadId: undefined,
				},
			});
		}
	},
	loader: ({ context }) => {
		ensureDummyCategories(context.queryClient);

		return null;
	},
	component: () => (
		<Suspense fallback={<LoadingUI />}>
			<Outlet />
		</Suspense>
	),
});
