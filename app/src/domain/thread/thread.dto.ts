import type { CreateThreadRequestSchema, GetThreadResponseSchema, GetThreadsResponseSchema } from "@/domain/thread/thread.schema";
import type { z } from "zod";

export type CreateThreadRequestDto = z.infer<typeof CreateThreadRequestSchema>;

export type GetThreadResponseDto = z.infer<typeof GetThreadResponseSchema>
export type GetThreadsResponseDto = z.infer<typeof GetThreadsResponseSchema>