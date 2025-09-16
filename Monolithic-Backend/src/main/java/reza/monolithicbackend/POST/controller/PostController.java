package reza.monolithicbackend.POST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reza.monolithicbackend.FaceEmbedding.services.DeepFaceService;
import reza.monolithicbackend.POST.config.FireBaseService;
import reza.monolithicbackend.POST.domains.dtos.request.*;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostType;
import reza.monolithicbackend.POST.services.PostService;
import reza.monolithicbackend.qdrant.QdrantService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/post")
public class PostController {

    private PostService postService;

    private FireBaseService firebaseService;
    private DeepFaceService deepFaceService;
    QdrantService qdrantService;

    @Autowired
    public PostController(PostService postService, FireBaseService firebaseService, DeepFaceService deepFaceService, QdrantService qdrantService) {
        this.postService = postService;
        this.firebaseService = firebaseService;
        this.deepFaceService = deepFaceService;
        this.qdrantService = qdrantService;
    }



    @PostMapping("/create")
    public ResponseEntity<BaseResponse<Post, String>> create(@RequestBody CreatePostRequest request) {
        try {
            // Upload files and get URLs
            List<String> imageUrls = new ArrayList<>();
            if (request.getFiles() != null && !request.getFiles().isEmpty()) {
                for (String base64File : request.getFiles()) {
                    String fileUrl = firebaseService.uploadBase64File(base64File);
                    imageUrls.add(fileUrl);
                }
            }




            System.out.println("damn");

            // Create post with the uploaded image URLs
            Post createdPost = postService.createPost(request, imageUrls);

            System.out.println("created post");

            if (Objects.equals(request.getCategory(), "Human"))
                deepFaceService.recieveFaceFiles(createdPost.getPostId(), request.getFiles());
            return BaseResponse.created("Post created successfully", createdPost);
        } catch (Exception e) {
            return BaseResponse.badRequest("Failed to create post: " + e.getMessage(), null);
        }
    }



    @GetMapping("/face-search/{postId}")
    public ResponseEntity<BaseResponse<List<String>, String>> getFaceSearch(@PathVariable UUID postId) {
        try {
            System.out.println("Searching for postId: " + postId.toString());

            List<String> rawPostIds = qdrantService.search("Facenet512", postId.toString(), 100);

            // Clean up the UUID format - extract just the UUID value
            List<String> cleanPostIds = rawPostIds.stream()
                    .map(id -> id.replaceAll("uuid: \"", "").replaceAll("\"\\s*", ""))
                    .collect(Collectors.toList());

            System.out.println("Search results count: " + cleanPostIds.size());
            System.out.println("Cleaned search results: " + cleanPostIds);

            return BaseResponse.success("Face search completed successfully", cleanPostIds);

        } catch (RuntimeException e) {
            System.out.println("RuntimeException: " + e.getMessage());
            return BaseResponse.badRequest("Failed to perform face search: " + e.getMessage(), null);
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }






}
