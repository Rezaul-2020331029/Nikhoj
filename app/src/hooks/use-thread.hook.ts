import type { CreateThreadRequestDto } from "@/domain/thread/thread.dto";
import { ThreadService } from "@/services/thread/thread.service";
import type { ThreadViewModel } from "@/services/thread/thread.viewmodel";
import { queryClient } from "@/shared/client/query.client";
import { createMutationOptions, createQueryOptions } from "@/shared/query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export function useCreateThread() {
	return useMutation(
		createMutationOptions<ThreadViewModel, CreateThreadRequestDto>({
			mutationFn: ThreadService.createThread,
			options: {
				onSuccess: async () => {
					await queryClient.refetchQueries({ queryKey: ["thread"] });
					return null;
				},
			},
		})
	);
}

export function useGetAllThread() {
	return useSuspenseQuery(
		createQueryOptions({
			queryKey: ["thread"] as const,
			queryFn: ThreadService.getAllThread,
			options: {
				staleTime: 5 * 60 * 1000,
			},
		})
	);
}
