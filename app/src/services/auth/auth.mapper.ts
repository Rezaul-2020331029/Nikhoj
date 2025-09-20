import type { LoginResponseDto } from "@/domain/auth/login/login.dto";
import type { SignupResponseDto } from "@/domain/auth/signup/signup.dto";
import type { GetUserResponseDto } from "@/domain/auth/user/user.dto";
import type { AuthViewModel, UserViewModel } from "@/services/auth/auth.viewmodel";

export function mapSignupDtoToVm(dto: SignupResponseDto): AuthViewModel {
	return {
		token: dto,
	};
}

export function mapLoginDtoToVm(dto: LoginResponseDto): AuthViewModel {
	return {
		token: dto,
	};
}

export function mapUserResponseDtoToVm(dto: GetUserResponseDto): UserViewModel {
	return { ...dto };
}
