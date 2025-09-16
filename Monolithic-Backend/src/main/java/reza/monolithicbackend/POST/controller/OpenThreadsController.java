package reza.monolithicbackend.POST.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reza.monolithicbackend.Auth.service.AuthenticationService;
import reza.monolithicbackend.POST.domains.dtos.request.SearchThreadReq;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;
import reza.monolithicbackend.POST.domains.dtos.response.GetAllThreadResposne;
import reza.monolithicbackend.POST.domains.entities.Threads;
import reza.monolithicbackend.POST.services.ThreadService;

import java.util.List;

@RestController
@RequestMapping("/api/guest/thread")
public class OpenThreadsController {
    private AuthenticationService authenticationService;
    private final ThreadService threadService;
    public OpenThreadsController(AuthenticationService authenticationService, ThreadService threadService) {
        this.authenticationService = authenticationService;
        this.threadService = threadService;
    }


    @PostMapping("/search")
    public ResponseEntity<BaseResponse<Page<Threads>, String>> searchThreads(@RequestBody SearchThreadReq searchReq) {
        try {
            Page<Threads> threads = threadService.searchThreads(searchReq);
            return BaseResponse.success("Threads retrieved successfully", threads);
        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to search threads: " + e.getMessage(), null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<Page<Threads>, Object>> getAllThreads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Threads> threads = threadService.getThreadsSortedByCreation(pageable);
            return BaseResponse.success("Threads retrieved successfully", threads);
        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to retrieve threads: " + e.getMessage(), null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<Threads, String>> getThread(@PathVariable Long id) {
        try {
            Threads thread = threadService.getThread(id);
            if (thread == null) {
                return BaseResponse.badRequest("Thread not found", null);
            }
            return BaseResponse.success("Thread retrieved successfully", thread);
        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to retrieve thread: " + e.getMessage(), null);
        }
    }

    @GetMapping("/")
    public ResponseEntity<BaseResponse<List<GetAllThreadResposne>, Object>> getAllThreads() {
        try {
            List<Threads> threads = threadService.getAllThreads();
            List<GetAllThreadResposne> responseList = threads.stream().map(thread -> {
                GetAllThreadResposne dto = new GetAllThreadResposne();
                dto.setThreadId(thread.getThreadId());
                dto.setTitle(thread.getTitle());
                dto.setDescription(thread.getDescription());
                dto.setLocation(thread.getLocation());
                dto.setCreated(thread.getCreated());
                return dto;
            }).toList();
            return BaseResponse.success("Threads retrieved successfully", responseList);
        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to retrieve threads: " + e.getMessage(), null);
        }
    }

}
