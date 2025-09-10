package reza.monolithicbackend.POST.services;

import reza.monolithicbackend.POST.domains.dtos.request.CreatePostRequest;
import reza.monolithicbackend.POST.domains.entities.Post;

import java.util.List;
import java.util.UUID;

public interface PostService {

    Post createPost(CreatePostRequest request, List<String> imageUrls);
    Post getPostById(UUID postId);
}
