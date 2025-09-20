import type { UseQueryOptions, UseMutationOptions, UseInfiniteQueryOptions } from "@tanstack/react-query";

type QueryFn<T> = () => Promise<T>;

type InfiniteQueryFn<T, TPageParam = unknown> = (context: { pageParam: TPageParam }) => Promise<T>;

// Generic helper for query options
export function createQueryOptions<T, K extends readonly unknown[]>({
	queryKey,
	queryFn,
	options,
}: {
	queryKey: K;
	queryFn: QueryFn<T>;
	options?: Omit<UseQueryOptions<T, unknown, T, K>, "queryKey" | "queryFn">;
}) {
	return {
		queryKey,
		queryFn,
		...options,
	} as const;
}

export function createInfiniteQueryOptions<T, K extends readonly unknown[], TPageParam = unknown>({
	queryKey,
	queryFn,
	getNextPageParam,
	initialPageParam,
	options,
}: {
	queryKey: K;
	queryFn: InfiniteQueryFn<T, TPageParam>;
	getNextPageParam: (
		lastPage: T,
		allPages: T[],
		lastPageParam: TPageParam,
		allPageParams: TPageParam[]
	) => TPageParam | undefined;
	initialPageParam: TPageParam;
	options?: Omit<
		UseInfiniteQueryOptions<T, unknown, T, K, TPageParam>,
		"queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
	>;
}) {
	return {
		queryKey,
		queryFn,
		getNextPageParam,
		initialPageParam,
		...options,
	} as const;
}

// Generic mutation helper
export function createMutationOptions<TData, TVariables = void, TError = unknown>({
	mutationFn,
	options,
}: {
	mutationFn: (variables: TVariables) => Promise<TData>;
	options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">;
}) {
	return {
		mutationFn,
		...options,
	} as const;
}
