package reza.monolithicbackend.POST.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reza.monolithicbackend.POST.domains.dtos.advance.PostDTO;
import reza.monolithicbackend.POST.domains.dtos.request.*;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostStatus;
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

    Page<Post> searchPosts(String search,String type, Pageable pageable);

    Post updatePostStatus(ChangePostStatusReq req);

    Post updatePost(UpdatePostReq req);

    void deletePost(UUID postId);

    Page<PostDTO> advanceSearch(AdvanceSearchReq req, Pageable pageable);






}
