// import { create } from "zustand";

// type AuthStore = {
// 	token: string | null;
// 	setToken: (token: string) => void;
// 	clearToken: () => void;
// };

// export const useAuthStore = create<AuthStore>((set) => {
// 	return {
// 		token: null,
// 		setToken: (token) => set({ token }),
// 		clearToken: () => set({ token: null }),
// 	};
// });

import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import the persist middleware

type AuthStore = {
	token: string | null;
	setToken: (token: string) => void;
	clearToken: () => void;
};

// TODO: Remove the persist store once the auth setup is done
export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token }),
			clearToken: () => set({ token: null }),
		}),
		{
			name: "auth-storage", // unique name for your store in localStorage
		}
	)
);
