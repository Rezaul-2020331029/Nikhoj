import type { GetUserResponseSchema } from "@/domain/auth/user/user.schema";
import type { z } from "zod";

export type GetUserResponseDto = z.infer<typeof GetUserResponseSchema>;
