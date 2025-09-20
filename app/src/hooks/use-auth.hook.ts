import { QueryClient, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";
import type { SignupRequestDto } from "@/domain/auth/signup/signup.dto";
import type { LoginRequestDto } from "@/domain/auth/login/login.dto";
import type { AuthViewModel } from "@/services/auth/auth.viewmodel";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/use-auth.store";
import { createMutationOptions, createQueryOptions } from "@/shared/query";
import { queryClient } from "@/shared/client/query.client";
import { usePostStore } from "@/store/use-post.store";

// Signup hook
export function useSignup() {
	const navigate = useNavigate();
	const { setToken } = useAuthStore();

	return useMutation(
		createMutationOptions<AuthViewModel, SignupRequestDto>({
			mutationFn: AuthService.signup,
			options: {
				onSuccess: async ({ token }) => {
					setToken(token);
					await queryClient.refetchQueries({ queryKey: ["profile"] as const });
					navigate({ to: "/" });
				},
			},
		})
	);
}

// Login hook
export function useLogin() {
	const { setToken } = useAuthStore();
	const navigate = useNavigate();

	return useMutation(
		createMutationOptions<AuthViewModel, LoginRequestDto>({
			mutationFn: AuthService.login,
			options: {
				onSuccess: async ({ token }) => {
					setToken(token);
					await queryClient.refetchQueries({ queryKey: ["profile"] as const });
					navigate({ to: "/" });
				},

				onError(error) {
					console.error(error);
				},
			},
		})
	);
}

// Logout hook
export function useLogout() {
	const navigate = useNavigate();
	const { clearToken } = useAuthStore();
	const { clearPost } = usePostStore();

	return useMutation(
		createMutationOptions<unknown, never>({
			mutationFn: AuthService.logout,
			options: {
				onSuccess: () => {
					clearToken();
					clearPost();
					queryClient.clear();
					queryClient.invalidateQueries();
					navigate({ to: "/" });
				},
			},
		})
	);
}

export function useGetProfile() {
	return useSuspenseQuery(
		createQueryOptions({
			queryKey: ["profile"] as const,
			queryFn: AuthService.getProfile,
			options: {
				staleTime: Infinity,
				gcTime: Infinity,
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
			},
		})
	);
}

export async function ensureProfile(queryClient: QueryClient) {
	await queryClient.ensureQueryData(
		createQueryOptions({
			queryKey: ["profile"] as const,
			queryFn: AuthService.getProfile,
			options: {
				staleTime: Infinity,
				gcTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		})
	);
}
