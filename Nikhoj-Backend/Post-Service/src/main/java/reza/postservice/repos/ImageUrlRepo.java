package reza.postservice.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.postservice.domains.entities.ImageUrl;
@Repository

public interface ImageUrlRepo extends ListCrudRepository<ImageUrl, Long> {
}
