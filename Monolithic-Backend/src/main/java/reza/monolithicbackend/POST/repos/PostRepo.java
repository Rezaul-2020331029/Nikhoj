package reza.monolithicbackend.POST.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Post;

import java.util.UUID;
@Repository

public interface PostRepo extends ListCrudRepository<Post, UUID> {
}
