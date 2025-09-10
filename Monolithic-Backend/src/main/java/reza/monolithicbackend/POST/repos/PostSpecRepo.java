package reza.monolithicbackend.POST.repos;

import org.springframework.data.repository.ListCrudRepository;
import reza.monolithicbackend.POST.domains.entities.PostSpec;

public interface PostSpecRepo extends ListCrudRepository<PostSpec, Long> {
}
