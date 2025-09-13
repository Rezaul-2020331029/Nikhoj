package reza.monolithicbackend.POST.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reza.monolithicbackend.Auth.service.AuthenticationService;
import reza.monolithicbackend.POST.domains.dtos.request.CreateThreadRequest;
import reza.monolithicbackend.POST.domains.dtos.request.SearchThreadReq;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;
import reza.monolithicbackend.POST.domains.entities.Threads;
import reza.monolithicbackend.POST.services.ThreadService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/threads")
public class ThreadsController {

    private AuthenticationService authenticationService;
    private ThreadService threadService;
    public ThreadsController(AuthenticationService authenticationService, ThreadService threadService) {
        this.authenticationService = authenticationService;
        this.threadService = threadService;
    }


    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createThread(@RequestBody CreateThreadRequest createThreadRequest) {
        try {
            UUID userId = authenticationService.getCurrentUserId();

            Threads threads = threadService.createThread(
                    createThreadRequest.getTitle(),
                    createThreadRequest.getDescription(),
                    createThreadRequest.getLocation(),
                    userId
            );

            return ResponseEntity.ok(BaseResponse.builder()
                    .statusCode(String.valueOf(201))
                    .status("SUCCESS")
                    .message("Thread created successfully")
                    .build());

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(BaseResponse.builder()
                    .statusCode(String.valueOf(500))
                    .status("ERROR")
                    .message("Failed to create thread: " + e.getMessage())
                    .build());
        }

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
    public ResponseEntity<BaseResponse<Page<Threads>, String>> getAllThreads(
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


    @GetMapping("/user")
    public ResponseEntity<BaseResponse<List<Threads>, String>> getThreadsByUser() {
        try {
            UUID userId = authenticationService.getCurrentUserId();
            List<Threads> threads = threadService.getThreadsByUserId(userId);

            return BaseResponse.success("Threads retrieved successfully", threads);
        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to retrieve user threads: " + e.getMessage(), null);
        }
    }





}
