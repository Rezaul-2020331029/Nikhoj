package reza.monolithicbackend.POST.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Post;
import reza.monolithicbackend.POST.domains.entities.PostType;
import reza.monolithicbackend.POST.domains.entities.Threads;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Repository

public interface PostRepo extends ListCrudRepository<Post, UUID>, JpaSpecificationExecutor<Post> {
    List<Post> findAllByPosterId(UUID posterId);

    Page<Post> findAllByPostType(PostType postType, Pageable pageable);

    Page<Post> findAllByCategory(String category, Pageable pageable);

    Page<Post> findAllByThreads_ThreadId(Long threadsThreadId, Pageable pageable);
    @Query("SELECT DISTINCT p.threads FROM Post p WHERE p.posterId = :posterId")
    List<Threads> findDistinctThreadsByPosterId(@Param("posterId") UUID posterId);

    Page<Post> findAllByThreads_Title(String threadsTitle, Pageable pageable);
    @Query("SELECT p FROM Post p WHERE p.category = :category AND p.district = :district " +
            "AND p.postType = :postType AND DATE(p.created) = :date AND p.threads.threadId = :threadId")
    Page<Post> findAllByCategoryAndDistrictAndPostTypeAndDateAndThreads_ThreadId(
            @Param("category") String category,
            @Param("district") String district,
            @Param("postType") PostType postType,
            @Param("date") LocalDate date,
            @Param("threadId") Long threadId,
            Pageable pageable
    );
//    Page<Post> findAllByCategoryAndDistrictAndPostTypeAndCreatedAndThreads_ThreadId(String category, String district, PostType postType, LocalDateTime created, Long threadsThreadId);
}
