package reza.monolithicbackend.POST.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Category;
import reza.monolithicbackend.POST.domains.entities.Specification;


import java.util.List;

@Repository
public interface CategoryRepo extends ListCrudRepository<Category, Long> {
    Category getCategoryByName(String name);

    List<Category> getCategoryByNameAndSpecificationsAndName(String name, List<Specification> specifications, String name1);

    Category findCategoryByName(String name);
}
