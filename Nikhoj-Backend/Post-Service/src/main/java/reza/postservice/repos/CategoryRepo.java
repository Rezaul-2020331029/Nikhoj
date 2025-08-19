package reza.postservice.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.postservice.domains.entities.Category;
import reza.postservice.domains.entities.Specification;

import java.util.List;

@Repository
public interface CategoryRepo extends ListCrudRepository<Category, Long> {
    Category getCategoryByName(String name);

    List<Category> getCategoryByNameAndSpecificationsAndName(String name, List<Specification> specifications, String name1);
}
