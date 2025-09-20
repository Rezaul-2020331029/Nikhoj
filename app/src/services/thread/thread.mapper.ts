import type { GetThreadResponseDto, GetThreadsResponseDto } from "@/domain/thread/thread.dto";
import type { ThreadsViewModel, ThreadViewModel } from "@/services/thread/thread.viewmodel";

export function mapThreadResponseDtoToVm(dto: GetThreadResponseDto): ThreadViewModel {
	return {
		id: dto.threadId,
		title: dto.title,
		description: dto.description,
		location: dto.location,
	};
}

export function mapThreadsResponseDtoToVm(dto: GetThreadsResponseDto): ThreadsViewModel {
	return dto.map(mapThreadResponseDtoToVm);
}
