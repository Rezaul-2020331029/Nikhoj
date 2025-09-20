import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PostViewModel } from "@/services/post/post.viewmodel";

type PostStore = {
	post: PostViewModel | null;
	setPost: (post: PostViewModel) => void;
	clearPost: () => void;
};

export const usePostStore = create<PostStore>()(
	persist(
		(set) => ({
			post: null,
			setPost: (post) => set({ post }),
			clearPost: () => set({ post: null }),
		}),
		{
			name: "post-storage", // key in localStorage
		}
	)
);
