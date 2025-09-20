import { queryClient } from "@/shared/client/query.client";
import { useAuthStore } from "@/store/use-auth.store";
import { usePostStore } from "@/store/use-post.store";
import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({ baseURL: "http://localhost:7000/api" });

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	if (config.headers) {
		config.headers.Accept = "application/json";
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
}

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().clearToken();
			usePostStore.getState().clearPost();
			queryClient.clear();
			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);
