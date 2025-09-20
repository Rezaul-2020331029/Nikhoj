package reza.monolithicbackend.POST.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.ImageUrl;

@Repository

public interface ImageUrlRepo extends ListCrudRepository<ImageUrl, Long> {
}
