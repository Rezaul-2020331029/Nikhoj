export type AuthViewModel = {
	token: string;
};

export type UserViewModel = {
	id: string;
	name: string;
	email: string;
	imageUrl: string | null;
	emailVerified: boolean;
	userRoles: string[];
};
