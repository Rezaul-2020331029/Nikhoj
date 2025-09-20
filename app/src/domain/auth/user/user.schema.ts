import { z } from "zod";

export const GetUserResponseSchema = z.object({
	id: z.uuid({ message: "Invalid or missing user id" }),
	name: z.string(),
	email: z.email({ message: "Invalid mr missing user email" }),
	imageUrl: z.string().nullable(),
	emailVerified: z.boolean(),
	userRoles: z.array(z.string()),
});
