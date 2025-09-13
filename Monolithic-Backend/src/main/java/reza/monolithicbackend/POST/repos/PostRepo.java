package reza.monolithicbackend.POST.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostType;
import reza.monolithicbackend.POST.domains.entities.Threads;

import java.util.List;
import java.util.UUID;
@Repository

public interface PostRepo extends ListCrudRepository<Post, UUID> {
    List<Post> findAllByPosterId(UUID posterId);

    Page<Post> findAllByPostType(PostType postType, Pageable pageable);

    Page<Post> findAllByCategory(String category, Pageable pageable);

    Page<Post> findAllByThreads_ThreadId(Long threadsThreadId, Pageable pageable);
    @Query("SELECT DISTINCT p.threads FROM Post p WHERE p.posterId = :posterId")
    List<Threads> findDistinctThreadsByPosterId(@Param("posterId") UUID posterId);

    Page<Post> findAllByThreads_Title(String threadsTitle, Pageable pageable);
}
