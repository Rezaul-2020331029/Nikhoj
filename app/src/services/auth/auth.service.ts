import { AuthApi } from "@/api/auth/auth.api";
import type { SignupRequestDto } from "@/domain/auth/signup/signup.dto";
import type { LoginRequestDto } from "@/domain/auth/login/login.dto";
import type { AuthViewModel, UserViewModel } from "@/services/auth/auth.viewmodel";
import { mapSignupDtoToVm, mapLoginDtoToVm, mapUserResponseDtoToVm } from "@/services/auth/auth.mapper";

export class AuthService {
	// Signup
	static async signup(dto: SignupRequestDto): Promise<AuthViewModel> {
		const response = await AuthApi.signup(dto);
		return mapSignupDtoToVm(response);
	}

	// Login
	static async login(dto: LoginRequestDto): Promise<AuthViewModel> {
		const response = await AuthApi.login(dto);
		return mapLoginDtoToVm(response);
	}

	// Logout
	static async logout(): Promise<void> {
		await AuthApi.logout();
	}

	static async getProfile(): Promise<UserViewModel> {
		const response = await AuthApi.profile();
		return mapUserResponseDtoToVm(response);
	}
}
