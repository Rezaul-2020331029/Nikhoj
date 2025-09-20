package reza.monolithicbackend.POST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reza.monolithicbackend.FaceEmbedding.services.DeepFaceService;
import reza.monolithicbackend.POST.config.FireBaseService;
import reza.monolithicbackend.POST.domains.dtos.advance.PostDTO;
import reza.monolithicbackend.POST.domains.dtos.request.*;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostType;
import reza.monolithicbackend.POST.services.PostService;
import reza.monolithicbackend.qdrant.QdrantService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guest/post")
public class OpenPostController {

    private PostService postService;

    private FireBaseService firebaseService;
    private DeepFaceService deepFaceService;
    QdrantService qdrantService;

    @Autowired
    public OpenPostController(PostService postService, FireBaseService firebaseService, DeepFaceService deepFaceService, QdrantService qdrantService) {
        this.postService = postService;
        this.firebaseService = firebaseService;
        this.deepFaceService = deepFaceService;
        this.qdrantService = qdrantService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BaseResponse<Post, String>> getPostById(@PathVariable UUID postId) {
        try {
            Post post = postService.getPostById(postId);
            return BaseResponse.success("Post retrieved successfully", post);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to retrieve post: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/post-list")
    public ResponseEntity<BaseResponse<List<Post>, String>> getPostList(
            @RequestBody GetPostByPostListReq req
    ) {
        try {
            List<Post> posts = postService.getPostsByPostIds(req.getPostIds());
            return BaseResponse.success("Posts retrieved successfully", posts);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to retrieve posts: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/postByuserId/{userId}")
    public ResponseEntity<BaseResponse<List<Post>, String>> getPostByUserId(
            @PathVariable UUID userId
    ) {
        try {
            List<Post> posts = postService.getPostsByUserId(userId);
            return BaseResponse.success("Posts retrieved successfully", posts);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to retrieve posts: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    @PostMapping ("postsByType")
    public ResponseEntity<BaseResponse<Page<Post>, Object>> postsByType(@RequestBody GetPostsByPostTypeReq request) {
        try {
            Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.by(Sort.Direction.DESC, "created"));
            PostType postType = PostType.valueOf(request.getPostType().toUpperCase());
            Page<Post> postPage = postService.getPostsByPostType(postType, pageable);
            return BaseResponse.success("Posts retrieved successfully", postPage);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to retrieve posts: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("postByCategory/")
    public ResponseEntity<BaseResponse<Page<Post>, Object>> getPostByCategory(@RequestBody GetPostsByCategoryReq request) {

        try {
            Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.by(Sort.Direction.DESC, "created"));
            Page<Post> postPage = postService.getPostsByCategory(request.getCategory(), pageable);
            return BaseResponse.success("Posts retrieved successfully", postPage);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Invalid request: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Failed to retrieve posts: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR, null);
        }


    }

    @GetMapping("/postByThread")
    public ResponseEntity<BaseResponse<Page<Post>, String>> getPostByThread(
            @RequestBody GetPostsByThread request) {

        Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.by(Sort.Direction.DESC, "created"));

        try {
            Page<Post> posts;

            if (request.getThreadName() == null || request.getThreadName().trim().isEmpty()) {
                posts = postService.getPostByThreadId(request.getThreadId(), pageable);
            } else {
                posts = postService.getPostByThreadTitle(request.getThreadName(), pageable);
            }

            return BaseResponse.success("Posts retrieved successfully", posts);

        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to retrieve posts: " + e.getMessage(), null);
        }
    }

    @PostMapping("/filter")
    public ResponseEntity<BaseResponse<Page<Post>, Object>> getPostsByFilter(
            @RequestBody GetPostsByFilterReq request
    ) {
        try {
            Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.by(Sort.Direction.DESC, "created"));
            Page<Post> postPage = postService.getPostsByFilter(request, pageable);
            return BaseResponse.success("Posts retrieved successfully", postPage);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to retrieve posts: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    @PostMapping("/search")
    public ResponseEntity<BaseResponse<Page<Post>, Object>> searchPost(
            @RequestBody SearchPost request
    ) {
        try {
            Pageable pageable = PageRequest.of(request.getPage(), request.getLimit(), Sort.by(Sort.Direction.DESC, "created"));
            Page<Post> postPage = postService.searchPosts(request.getSearch(),request.getType(), pageable);
            return BaseResponse.success("Posts retrieved successfully", postPage);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to retrieve posts: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/face-search/{postId}")
    public ResponseEntity<BaseResponse<List<Post>, String>> getFaceSearch(@PathVariable UUID postId) {
        try {
            System.out.println("Searching for postId: " + postId.toString());

            List<String> rawPostIds = qdrantService.search("Facenet512", postId.toString(), 100);

            // Clean up the UUID format and convert to UUID
            List<UUID> cleanPostIds = rawPostIds.stream()
                    .map(id -> id.replaceAll("uuid: \"", "").replaceAll("\"\\s*", ""))
                    .map(UUID::fromString)
                    .collect(Collectors.toList());

            System.out.println("Search results count: " + cleanPostIds.size());
            System.out.println("Cleaned search results: " + cleanPostIds);

            return BaseResponse.success("Face search completed successfully", postService.getPostsByPostIds(cleanPostIds));

        } catch (RuntimeException e) {
            System.out.println("RuntimeException: " + e.getMessage());
            return BaseResponse.badRequest("Failed to perform face search: " + e.getMessage(), null);
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @PostMapping("/advance-filter")
    public ResponseEntity<BaseResponse<Page<PostDTO>, Object>> advanceSearch(@RequestBody AdvanceSearchReq request) {
        try {
            Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), Sort.by("created").descending());
            Page<PostDTO> result = postService.advanceSearch(request, pageable);
            return BaseResponse.success("Success",result);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, List.of(e.getMessage()));
        }
    }






}
