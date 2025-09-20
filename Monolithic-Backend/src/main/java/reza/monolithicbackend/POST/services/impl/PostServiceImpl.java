package reza.monolithicbackend.POST.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reza.monolithicbackend.Auth.service.AuthenticationService;
import reza.monolithicbackend.POST.config.FireBaseService;
import reza.monolithicbackend.POST.domains.dtos.advance.ImageUrlDTO;
import reza.monolithicbackend.POST.domains.dtos.advance.PostDTO;
import reza.monolithicbackend.POST.domains.dtos.advance.PostSpecDTO;
import reza.monolithicbackend.POST.domains.dtos.request.*;
import reza.monolithicbackend.POST.domains.entities.*;
import reza.monolithicbackend.POST.repos.ImageUrlRepo;
import reza.monolithicbackend.POST.repos.PostRepo;
import reza.monolithicbackend.POST.repos.PostSpecRepo;
import reza.monolithicbackend.POST.repos.ThreadRepo;
import reza.monolithicbackend.POST.services.PostService;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final ThreadRepo threadRepo;
    private final AuthenticationService authenticationService;
    private final PostSpecRepo postSpecRepo;
    private final ImageUrlRepo imageUrlRepo;
    FireBaseService firebaseService;

    @Autowired
    public PostServiceImpl(PostRepo postRepo, ThreadRepo threadRepo, AuthenticationService authenticationService,
                           PostSpecRepo postSpecRepo, ImageUrlRepo imageUrlRepo, FireBaseService firebaseService) {
        this.postRepo = postRepo;
        this.threadRepo = threadRepo;
        this.authenticationService = authenticationService;
        this.postSpecRepo = postSpecRepo;
        this.imageUrlRepo = imageUrlRepo;
        this.firebaseService = firebaseService;
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
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setPostType(PostType.valueOf(request.getPostType().toUpperCase()));

        // Set location fields
        post.setDistrict(request.getDistrict());
        post.setCity(request.getCity());
        post.setSubDistrict(request.getSubDistrict());
        post.setPostOffice(request.getPostOffice());
        post.setRoadAddress(request.getRoadAddress());
        post.setCategory(request.getCategory());

        if (request.getContactNumber() != null) {
            post.setContactNumber(request.getContactNumber());
        }

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


    @Override
    public List<Post> getPostsByPostIds(List<UUID> postIds) {
        if (postIds == null || postIds.isEmpty()) {
            return List.of();
        }
        return postRepo.findAllById(postIds);
    }

    @Override
    public List<Post> getPostsByUserId(UUID userId) {
        if (userId == null) {
            return List.of();
        }
        return postRepo.findAllByPosterId(userId);
    }

    @Override
    public Page<Post> getPostsByPostType(PostType postType, Pageable pageable) {
        return postRepo.findAllByPostType(postType,pageable);
    }

    @Override
    public Page<Post> getPostsByCategory(String category, Pageable pageable) {
        return postRepo.findAllByCategory(category,pageable);
    }

    @Override
    public Page<Post> getPostByThreadId(long threadId, Pageable pageable) {
        return postRepo.findAllByThreads_ThreadId(threadId,pageable);
    }

    @Override
    public Page<Post> getPostByThreadTitle(String threadTitle, Pageable pageable) {
        return postRepo.findAllByThreads_Title(threadTitle,pageable);
    }

    public Page<Post> getPostsByFilter(GetPostsByFilterReq filter, Pageable pageable) {
        org.springframework.data.jpa.domain.Specification<Post> spec = Specification.where(null);

        // Optional date filter
        if (filter.getDate() != null) {
            LocalDate targetDate = filter.getDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(
                            criteriaBuilder.function("DATE", LocalDate.class, root.get("created")),
                            targetDate
                    )
            );
        }

        // Always filter by type (required)
        spec = spec.and((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("postType"), PostType.valueOf(filter.getType().toUpperCase()))
        );

        // Optional filters
        if (filter.getCategory() != null && !filter.getCategory().trim().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("category"), filter.getCategory())
            );
        }

        if (filter.getDistrict() != null && !filter.getDistrict().trim().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("district"), filter.getDistrict())
            );
        }

        if (filter.getThreadId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("threads").get("threadId"), filter.getThreadId())
            );
        }

        return postRepo.findAll(spec, pageable);
    }

    @Override
    public Page<Post> searchPosts(String search, String type, Pageable pageable) {
        org.springframework.data.jpa.domain.Specification<Post> spec = Specification.where(null);

        if (search != null && !search.trim().isEmpty()) {
            String keyword = "%" + search.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("title")), keyword),
                    cb.like(cb.lower(root.get("description")), keyword),
                    cb.like(cb.lower(root.get("category")), keyword),
                    cb.like(cb.lower(root.get("district")), keyword),
                    cb.like(cb.lower(root.get("city")), keyword),
                    cb.like(cb.lower(root.get("subDistrict")), keyword),
                    cb.like(cb.lower(root.get("postOffice")), keyword),
                    cb.like(cb.lower(root.get("roadAddress")), keyword),
                    cb.like(cb.lower(root.get("address")), keyword),
                    cb.like(cb.lower(root.get("contactNumber")), keyword)
            ));
        }

        if (type != null && !type.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("postType"), PostType.valueOf(type.trim().toUpperCase()))
            );
        }

        return postRepo.findAll(spec, pageable);
    }


//    @Override
//    public Page<Post> searchPosts(String search, String type, Pageable pageable) {
//        Specification<Post> spec = Specification.where(null);
//
//        if (search != null && !search.trim().isEmpty()) {
//            String keyword = "%" + search.trim().toLowerCase() + "%";
//            spec = spec.and((root, query, cb) -> cb.or(
//                    cb.like(cb.lower(root.get("title")), keyword),
//                    cb.like(cb.lower(root.get("description")), keyword),
//                    cb.like(cb.lower(root.get("category")), keyword),
//                    cb.like(cb.lower(root.get("district")), keyword),
//                    cb.like(cb.lower(root.get("city")), keyword),
//                    cb.like(cb.lower(root.get("subDistrict")), keyword),
//                    cb.like(cb.lower(root.get("postOffice")), keyword),
//                    cb.like(cb.lower(root.get("roadAddress")), keyword),
//                    cb.like(cb.lower(root.get("address")), keyword),
//                    cb.like(cb.lower(root.get("contactNumber")), keyword)
//            ));
//        }
//
//        if (type != null && !type.trim().isEmpty()) {
//            spec = spec.and((root, query, cb) ->
//                    cb.equal(root.get("postType"), PostType.valueOf(type.trim().toUpperCase()))
//            );
//        }
//
//        List<Post> all = postRepo.findAll(spec);
//
//        // In-memory filter for postSpecs.value
//        if (search != null && !search.trim().isEmpty()) {
//            String lowerKeyword = search.trim().toLowerCase();
//            all = all.stream()
//                    .filter(post -> post.getPostSpecs() != null && post.getPostSpecs().stream()
//                            .anyMatch(specObj -> specObj.getValue() != null && specObj.getValue().toLowerCase().contains(lowerKeyword)))
//                    .toList();
//        }
//
//        // Manual pagination
//        int start = (int) pageable.getOffset();
//        int end = Math.min(start + pageable.getPageSize(), all.size());
//        List<Post> pageContent = (start <= end) ? all.subList(start, end) : List.of();
//
//        return new org.springframework.data.domain.PageImpl<>(pageContent, pageable, all.size());
//    }


    @Override
    public Post updatePostStatus(ChangePostStatusReq req) {
        UUID posterId = authenticationService.getCurrentUserId();

        // Fetch the post
        Post post = postRepo.findById(req.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + req.getPostId()));

        // Check if the current user is the owner
        if (!post.getPosterId().equals(posterId)) {
            throw new RuntimeException("You are not authorized to update this post's status.");
        }

        // Update the status
        post.setStatus(req.getPostStatus());

        // Save and return the updated post
        return postRepo.save(post);
    }

    @Override
    public Post updatePost(UpdatePostReq req) {
        UUID posterId = authenticationService.getCurrentUserId();

        // Fetch the post
        Post post = postRepo.findById(req.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + req.getPostId()));

        // Check if the current user is the owner
        if (!post.getPosterId().equals(posterId)) {
            throw new RuntimeException("You are not authorized to update this post.");
        }

        // Update fields if present in the request
        if (req.getTitle() != null) post.setTitle(req.getTitle());
        if (req.getDescription() != null) post.setDescription(req.getDescription());
        if (req.getCategory() != null) post.setCategory(req.getCategory());
        if (req.getDistrict() != null) post.setDistrict(req.getDistrict());
        if (req.getCity() != null) post.setCity(req.getCity());
        if (req.getSubDistrict() != null) post.setSubDistrict(req.getSubDistrict());
        if (req.getPostOffice() != null) post.setPostOffice(req.getPostOffice());
        if (req.getRoadAddress() != null) post.setRoadAddress(req.getRoadAddress());
        if (req.getContactNumber() != null) post.setContactNumber(req.getContactNumber());

        // Update only the values of existing postSpecs
        if (req.getPostSpecs() != null && post.getPostSpecs() != null) {
            for (PostSpec spec : post.getPostSpecs()) {
                if (req.getPostSpecs().containsKey(spec.getName())) {
                    spec.setValue(req.getPostSpecs().get(spec.getName()));
                    postSpecRepo.save(spec);
                }
            }
        }

        // Save and return the updated post
        return postRepo.save(post);
    }


    @Override
    public void deletePost(UUID postId) {
        UUID userId = authenticationService.getCurrentUserId();

        // Fetch the post
        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));

        // Check ownership
        if (!post.getPosterId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this post.");
        }

        if (post.getImageUrls() != null && !post.getImageUrls().isEmpty()) {
            for (ImageUrl imageUrl : post.getImageUrls()) {
                firebaseService.deleteFileByUrl(imageUrl.getUrl());
            }
            imageUrlRepo.deleteAll(post.getImageUrls());
        }

        // Delete associated post specs
        if (post.getPostSpecs() != null && !post.getPostSpecs().isEmpty()) {
            postSpecRepo.deleteAll(post.getPostSpecs());
        }

        // Delete the post itself
        postRepo.delete(post);
    }

//    @Override
//    public Page<Post> advanceSearch(AdvanceSearchReq req, Pageable pageable) {
//        Specification<Post> spec = Specification.where(null);
//
//        System.out.println(req);
//        if (req.getPostType() != null) {
//            spec = spec.and((root, query, cb) ->
//                    cb.equal(root.get("postType"), req.getPostType())
//            );
//        }
//
//        if (req.getCategory() != null && !req.getCategory().trim().isEmpty()) {
//            spec = spec.and((root, query, cb) ->
//                    cb.equal(root.get("category"), req.getCategory().trim())
//            );
//        }
//
//        if (req.getPostSpec() != null && !req.getPostSpec().isEmpty()) {
//            java.util.Set<UUID> postIds = new java.util.HashSet<>();
//            for (var entry : req.getPostSpec().entrySet()) {
//                String name = entry.getKey();
//                String value = entry.getValue();
//                if (name != null && value != null) {
//                    List<PostSpec> matchingSpecs = postSpecRepo.findByValueContainingIgnoreCase(value);
//                    matchingSpecs.stream()
//                            .filter(ps -> ps.getName().equalsIgnoreCase(name))
//                            .map(ps -> ps.getPost().getPostId())
//                            .forEach(postIds::add);
//                }
//            }
//            if (postIds.isEmpty()) {
//                return Page.empty(pageable);
//            }
//            spec = spec.and((root, query, cb) -> root.get("postId").in(postIds));
//        }
//
//        return postRepo.findAll(spec, pageable);
//    }

    @Override
    public Page<PostDTO> advanceSearch(AdvanceSearchReq req, Pageable pageable) {
        Specification<Post> spec = Specification.not((root, query, cb) -> cb.disjunction());

        if (req.getPostType() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("postType"), req.getPostType().toUpperCase())
            );
        }

        if (req.getCategory() != null && !req.getCategory().trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("category"), req.getCategory().trim())
            );
        }

        if (req.getPostSpec() != null && !req.getPostSpec().isEmpty()) {
            java.util.Set<UUID> postIds = new java.util.HashSet<>();
            for (var entry : req.getPostSpec().entrySet()) {
                String name = entry.getKey();
                String value = entry.getValue();
                if (name != null && value != null) {
                    List<PostSpec> matchingSpecs = postSpecRepo.findByValueContainingIgnoreCase(value);
                    matchingSpecs.stream()
                            .filter(ps -> ps.getName().equalsIgnoreCase(name))
                            .map(ps -> ps.getPost().getPostId())
                            .forEach(postIds::add);
                }
            }
            if (postIds.isEmpty()) {
                return Page.empty(pageable);
            }
            spec = spec.and((root, query, cb) -> root.get("postId").in(postIds));
        }

        Page<Post> postPage = postRepo.findAll(spec, pageable);

        return postPage.map(post -> {
            PostDTO dto = new PostDTO();
            dto.setPostId(post.getPostId());
            dto.setPosterId(post.getPosterId());
            dto.setContactNumber(post.getContactNumber());
            dto.setTitle(post.getTitle());
            dto.setPostType(post.getPostType().name());
            dto.setDescription(post.getDescription());
            dto.setCategory(post.getCategory());
            dto.setDistrict(post.getDistrict());
            dto.setCity(post.getCity());
            dto.setSubDistrict(post.getSubDistrict());
            dto.setPostOffice(post.getPostOffice());
            dto.setRoadAddress(post.getRoadAddress());
            dto.setAddress(post.getAddress());
            dto.setCreated(post.getCreated());
            dto.setUpdated(post.getUpdated());
            dto.setStatus(post.getStatus().name());

            // Map postSpecs
            if (post.getPostSpecs() != null) {
                dto.setPostSpecs(post.getPostSpecs().stream().map(ps -> {
                    PostSpecDTO psDto = new PostSpecDTO();
                    psDto.setName(ps.getName());
                    psDto.setValue(ps.getValue());
                    return psDto;
                }).toList());
            }
            // Map imageUrls
            if (post.getImageUrls() != null) {
                dto.setImageUrls(post.getImageUrls().stream().map(img -> {
                    ImageUrlDTO imgDto = new ImageUrlDTO();
                    imgDto.setId(img.getId());
                    imgDto.setUrl(img.getUrl());
                    return imgDto;
                }).toList());
            }
            return dto;
        });
    }
}