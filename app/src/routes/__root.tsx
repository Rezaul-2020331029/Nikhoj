import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { NotFoundUI } from "@/presentation/404/not-found.ui";
import { ErrorUI } from "@/presentation/error/error.ui";
import { LoadingUI } from "@/presentation/loading/loading.ui";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	component: RootComponent,
	errorComponent: ErrorUI,
	notFoundComponent: NotFoundUI,
});

function RootComponent() {
	return (
		<React.Fragment>
			<React.Suspense fallback={<LoadingUI />}>
				<Outlet />
			</React.Suspense>
			{/* <TanStackRouterDevtools /> */}
			{/* <ReactQueryDevtools /> */}
		</React.Fragment>
	);
}
