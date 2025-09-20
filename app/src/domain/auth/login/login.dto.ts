import { LoginRequestSchema, LoginResponseSchema } from "@/domain/auth/login/login.schema";
import { z } from "zod";
export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;
export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
