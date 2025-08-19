package reza.postservice.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.postservice.domains.entities.Post;

import java.util.UUID;
@Repository

public interface PostRepo extends ListCrudRepository<Post, UUID> {
}
