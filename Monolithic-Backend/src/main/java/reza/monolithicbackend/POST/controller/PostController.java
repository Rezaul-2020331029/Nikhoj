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
import reza.monolithicbackend.POST.domains.dtos.request.*;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.services.PostService;
import reza.monolithicbackend.qdrant.QdrantService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


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






    @PostMapping("/change-status")
    public ResponseEntity<BaseResponse<Post, String>> changePostStatus(
            @RequestBody ChangePostStatusReq req
    ) {
        try {
            Post updatedPost = postService.updatePostStatus(req);
            return BaseResponse.success("Post status updated successfully", updatedPost);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to update post status: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<BaseResponse<Post, String>> updatePost(
            @RequestBody UpdatePostReq req
    ) {
        try {
            Post updatedPost = postService.updatePost(req);
            return BaseResponse.success("Post updated successfully", updatedPost);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to update post: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<BaseResponse<String,String>> deletePost(
            @PathVariable UUID postId
    ) {
        try {
            postService.deletePost(postId);
            return BaseResponse.success("Post deleted successfully", null);
        } catch (RuntimeException e) {
            return BaseResponse.badRequest("Failed to delete post: " + e.getMessage(), null);
        } catch (Exception e) {
            return BaseResponse.error("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }




}
