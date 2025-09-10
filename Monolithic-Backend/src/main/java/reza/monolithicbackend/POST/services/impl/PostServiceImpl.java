package reza.monolithicbackend.POST.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reza.monolithicbackend.Auth.service.AuthenticationService;
import reza.monolithicbackend.POST.domains.dtos.request.CreatePostRequest;
import reza.monolithicbackend.POST.domains.entities.*;
import reza.monolithicbackend.POST.repos.ImageUrlRepo;
import reza.monolithicbackend.POST.repos.PostRepo;
import reza.monolithicbackend.POST.repos.PostSpecRepo;
import reza.monolithicbackend.POST.repos.ThreadRepo;
import reza.monolithicbackend.POST.services.PostService;

import java.util.List;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final ThreadRepo threadRepo;
    private final AuthenticationService authenticationService;
    private final PostSpecRepo postSpecRepo;
    private final ImageUrlRepo imageUrlRepo;

    @Autowired
    public PostServiceImpl(PostRepo postRepo, ThreadRepo threadRepo, AuthenticationService authenticationService,
                           PostSpecRepo postSpecRepo, ImageUrlRepo imageUrlRepo) {
        this.postRepo = postRepo;
        this.threadRepo = threadRepo;
        this.authenticationService = authenticationService;
        this.postSpecRepo = postSpecRepo;
        this.imageUrlRepo = imageUrlRepo;
    }

    @Override
    public Post createPost(CreatePostRequest request, List<String> imageUrls) {
        // Get current user ID
        UUID posterId = authenticationService.getCurrentUserId();
        if (posterId == null) {
            throw new RuntimeException("User not authenticated");
        }

        // Create and save the post entity first
        Post post = new Post();
        post.setPosterId(posterId);
        post.setPostTiltle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setPostType(PostType.valueOf(request.getPostType().toUpperCase()));

        // Set location fields
        post.setDistrict(request.getDistrict());
        post.setCity(request.getCity());
        post.setSubDistrict(request.getSubDistrict());
        post.setPostOffice(request.getPostOffice());
        post.setRoadAddress(request.getRoadAddress());
        post.setCategory(request.getCategory());

        // Set thread if provided
        if (request.getThreadId() != null && !request.getThreadId().isEmpty()) {
            Threads thread = threadRepo.findById(Long.valueOf(request.getThreadId()))
                    .orElseThrow(() -> new RuntimeException("Thread not found"));
            post.setThreads(thread);
        }

        // Save the post first to get the generated ID
        Post savedPost = postRepo.save(post);

        // Create and save image URLs in ImageUrlRepo
        if (imageUrls != null && !imageUrls.isEmpty()) {
            List<ImageUrl> imageUrlEntities = imageUrls.stream()
                    .map(url -> {
                        ImageUrl imageUrl = new ImageUrl();
                        imageUrl.setUrl(url);
                        imageUrl.setPost(savedPost);
                        return imageUrlRepo.save(imageUrl); // Save each ImageUrl
                    })
                    .toList();
            savedPost.setImageUrls(imageUrlEntities);
        }

        // Create and save post specifications in PostSpecRepo
        if (request.getPostSpecs() != null && !request.getPostSpecs().isEmpty()) {
            List<PostSpec> postSpecs = request.getPostSpecs().entrySet().stream()
                    .map(entry -> {
                        PostSpec postSpec = new PostSpec();
                        postSpec.setName(entry.getKey());
                        postSpec.setValue(entry.getValue());
                        postSpec.setPost(savedPost);
                        return postSpecRepo.save(postSpec); // Save each PostSpec
                    })
                    .toList();
            savedPost.setPostSpecs(postSpecs);
        }

        // Return the post with all associations
        return savedPost;
    }

    @Override
    public Post getPostById(UUID postId) {
        return postRepo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
    }
}