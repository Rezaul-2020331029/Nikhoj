import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { queryClient } from "@/shared/client/query.client";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { Suspense } from "react";
import {LoadingUI} from "@/presentation/loading/loading.ui";

const router = createRouter({
	routeTree,
	context: { queryClient },
	scrollRestoration: true,
	defaultPreload: "intent",
});

setupRouterSsrQueryIntegration({
	router,
	queryClient,
	// optional:
	// handleRedirects: true,
	// wrapQueryClient: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	return (
		<Suspense fallback={<LoadingUI />}>
			<RouterProvider router={router} />;
		</Suspense>
	);
}
