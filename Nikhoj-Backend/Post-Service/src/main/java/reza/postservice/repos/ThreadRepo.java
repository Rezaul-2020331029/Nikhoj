package reza.postservice.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import reza.postservice.domains.entities.Threads;

import java.time.LocalDateTime;

@Repository

public interface ThreadRepo extends CrudRepository<Threads, Long> {

    @Query("SELECT t FROM Threads t ORDER BY t.created DESC")
    Page<Threads> findAllSortedByCreationDesc(Pageable pageable);

    Page<Threads> findAll(Pageable pageable);


    Page<Threads> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Threads> findByLocationContainingIgnoreCase(String location, Pageable pageable);

    Threads getThreadsByThreadId(Long threadId);

    Page<Threads> getAllByCreated(LocalDateTime created, Pageable pageable);
}
