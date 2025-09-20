package reza.monolithicbackend.POST.repos;

import org.springframework.data.repository.ListCrudRepository;
import reza.monolithicbackend.POST.domains.entities.PostSpec;

import java.util.List;

public interface PostSpecRepo extends ListCrudRepository<PostSpec, Long> {
    List<PostSpec> findByValueContainingIgnoreCase(String value);
}
