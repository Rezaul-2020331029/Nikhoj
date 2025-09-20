import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createQueryOptions } from "@/shared/query";
import { CategoryService } from "@/services/category/category.service";

export function useCategories() {
	return useSuspenseQuery(
		createQueryOptions({
			queryKey: ["categories"] as const,
			queryFn: CategoryService.getCategories,
			options: {
				staleTime: Infinity,
				gcTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		})
	);
}

export async function ensureCategories(queryClient: QueryClient) {
	await queryClient.ensureQueryData(
		createQueryOptions({
			queryKey: ["categories"] as const,
			queryFn: CategoryService.getCategories,
			options: {
				staleTime: Infinity,
				gcTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		})
	);
}

export function useDummyCategories() {
	return useSuspenseQuery(
		createQueryOptions({
			queryKey: ["categories"] as const,
			queryFn: CategoryService.getDummyCategories,
			options: {
				staleTime: Infinity,
				gcTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchInterval: Infinity,
			},
		})
	);
}

export async function ensureDummyCategories(queryClient: QueryClient) {
	await queryClient.ensureQueryData(
		createQueryOptions({
			queryKey: ["categories"] as const,
			queryFn: CategoryService.getDummyCategories,
			options: {
				staleTime: Infinity,
				gcTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		})
	);
}
