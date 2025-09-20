import { z } from "zod";
import { SignupRequestSchema, SignupResponseSchema } from "@/domain/auth/signup/signup.schema";

export type SignupRequestDto = z.infer<typeof SignupRequestSchema>;
export type SignupResponseDto = z.infer<typeof SignupResponseSchema>;
