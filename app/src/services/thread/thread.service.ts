import { ThreadApi } from "@/api/thread/thread.api";
import type { CreateThreadRequestDto } from "@/domain/thread/thread.dto";
import { mapThreadResponseDtoToVm, mapThreadsResponseDtoToVm } from "@/services/thread/thread.mapper";
import type { ThreadsViewModel, ThreadViewModel } from "@/services/thread/thread.viewmodel";

export class ThreadService {
	static async createThread(dto: CreateThreadRequestDto): Promise<ThreadViewModel> {
		const thread = await ThreadApi.createThread(dto);
		return mapThreadResponseDtoToVm(thread);
	}

	static async getAllThread(): Promise<ThreadsViewModel> {
		const threads = await ThreadApi.getAllThread();
		return mapThreadsResponseDtoToVm(threads);
	}
}
