import { ensureProfile } from "@/hooks/use-auth.hook";
import { ensureDummyCategories } from "@/hooks/use-category.hook";
import { LoadingUI } from "@/presentation/loading/loading.ui";
import { useAuthStore } from "@/store/use-auth.store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_auth")({
	beforeLoad: () => {
		const { token } = useAuthStore.getState();
		if (!token) {
			throw redirect({ to: "/" });
		}
	},
	loader: async ({ context }) => {
		ensureDummyCategories(context.queryClient);
		ensureProfile(context.queryClient);
		return null;
	},
	component: () => (
		<Suspense fallback={<LoadingUI />}>
			<Outlet />
		</Suspense>
	),
});
