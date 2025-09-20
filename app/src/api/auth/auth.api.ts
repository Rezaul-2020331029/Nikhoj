import { api } from "@/api/api.client";
import { responseParser } from "@/api/response.parser";
import type { LoginRequestDto, LoginResponseDto } from "@/domain/auth/login/login.dto";
import { LoginResponseSchema } from "@/domain/auth/login/login.schema";
import type { SignupRequestDto, SignupResponseDto } from "@/domain/auth/signup/signup.dto";
import { SignupResponseSchema } from "@/domain/auth/signup/signup.schema";
import type { GetUserResponseDto } from "@/domain/auth/user/user.dto";
import { GetUserResponseSchema } from "@/domain/auth/user/user.schema";

export class AuthApi {
	// Signup user
	static async signup(dto: SignupRequestDto): Promise<SignupResponseDto> {
		const response = await api.post<SignupResponseDto>("/auth/signup", dto);
		const parsed = responseParser(SignupResponseSchema, response);
		return parsed;
	}

	// Login user
	static async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
		const response = await api.post<LoginResponseDto>("/auth/login", dto);
		const parsed = responseParser(LoginResponseSchema, response);
		return parsed;
	}

	// Logout user
	static async logout(): Promise<void> {
		await api.post("/auth/logout");
	}

	static async profile(): Promise<GetUserResponseDto> {
		const response = await api.get("/profile");
		return responseParser(GetUserResponseSchema, response);
	}
}
