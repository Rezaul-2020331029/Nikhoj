import { z } from "zod";

export const SignupRequestSchema = z.object({
	// imageUrl: z.url({ message: "Invalid image url" }).nullable(),
	name: z.string().min(1, { message: "Fullname is required" }),
	email: z.email({ message: "Invalid email address" }),
	password: z
		.string({ message: "Password is required" })
		.min(8, { message: "Password must be at least 8 characters" })
		.refine((val) => /[a-z]/.test(val), {
			message: "Password must contain at least one lowercase letter",
		})
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least one uppercase letter",
		})
		.refine((val) => /\d/.test(val), {
			message: "Password must contain at least one number",
		})
		.refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
			message: "Password must contain at least one special character",
		}),
});

export const SignupResponseSchema = z.string({ message: "Token is missing" });
