package reza.monolithicbackend.POST.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reza.monolithicbackend.POST.domains.dtos.request.CreatePostRequest;
import reza.monolithicbackend.POST.domains.dtos.request.GetPostsByFilterReq;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostType;

import java.util.List;
import java.util.UUID;

public interface PostService {

    Post createPost(CreatePostRequest request, List<String> imageUrls);
    Post getPostById(UUID postId);
    List<Post> getPostsByPostIds(List<UUID> postIds);
    List<Post> getPostsByUserId(UUID postId);
    Page<Post> getPostsByPostType(PostType postType, Pageable pageable);

    Page<Post> getPostsByCategory(String category, Pageable pageable);

    Page<Post> getPostByThreadId(long threadId, Pageable pageable);
    Page<Post> getPostByThreadTitle(String threadTitle, Pageable pageable);

    Page<Post> getPostsByFilter(GetPostsByFilterReq filter, Pageable pageable);




}
