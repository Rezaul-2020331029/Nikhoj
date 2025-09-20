import { api } from "@/api/api.client";
import { responseParser } from "@/api/response.parser";
import type { CreateThreadRequestDto, GetThreadsResponseDto } from "@/domain/thread/thread.dto";
import { GetThreadResponseSchema, GetThreadsResponseSchema } from "@/domain/thread/thread.schema";

export class ThreadApi {
	// Signup user
	static async createThread(dto: CreateThreadRequestDto) {
		const response = await api.post<void>("/thread/create", dto);
		return responseParser(GetThreadResponseSchema, response);
	}

	static async getAllThread(): Promise<GetThreadsResponseDto> {
		const response = await api.get<void>("/guest/thread");

		return responseParser(GetThreadsResponseSchema, response);
	}
}
