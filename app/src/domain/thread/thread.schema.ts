import { z } from "zod";

export const CreateThreadRequestSchema = z.object({
	title: z.string().min(1, { message: "Thread title is required" }),
	description: z.string().min(1, { message: "Thread description is required" }),
	location: z.string().min(1, { message: "Thread location is required" }),
});

export const CreateThreadResponseSchema = z.object({
	status: z.number().int().positive(),
	title: z.string().min(1, { message: "Thread title is missing" }),
});

export const GetThreadResponseSchema = z.object({
	threadId: z.any(),
	title: z.string({ message: "Invalid thread title or missing" }),
	location: z.string({ message: "Invalid thread location or missing" }),
	description: z.string({ message: "Invalid thread description or missing" }),
});

export const GetThreadsResponseSchema = z.array(GetThreadResponseSchema);
