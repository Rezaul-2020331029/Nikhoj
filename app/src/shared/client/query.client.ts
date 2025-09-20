import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			throwOnError: true,
			// staleTime: Infinity,
			// gcTime: Infinity,
			retry: 1,
		},
	},
	queryCache: new QueryCache({
		onError(error) {
			const status = error instanceof AxiosError ? `${error.status}:` : null;
			throw new Error(`Something went wrong. ${status} ${error.message}`);
		},
	}),
});
