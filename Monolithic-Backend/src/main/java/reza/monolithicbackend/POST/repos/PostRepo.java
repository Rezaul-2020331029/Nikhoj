package reza.monolithicbackend.POST.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostType;

import java.util.List;
import java.util.UUID;
@Repository

public interface PostRepo extends ListCrudRepository<Post, UUID> {
    List<Post> findAllByPosterId(UUID posterId);

    Page<Post> findAllByPostType(PostType postType, Pageable pageable);

    Page<Post> findAllByCategory(String category, Pageable pageable);

    Page<Post> findAllByThreads_ThreadId(Long threadsThreadId, Pageable pageable);


    Page<Post> findAllByThreads_Title(String threadsTitle, Pageable pageable);
}
