package reza.monolithicbackend.POST.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Specification;

import java.util.List;

@Repository

public interface SpecificationRepo extends ListCrudRepository<Specification, Long> {
    Specification getSpecificationByName(String name);

    List<Specification> getSpecificationByCategory_Name(String categoryName);
}
