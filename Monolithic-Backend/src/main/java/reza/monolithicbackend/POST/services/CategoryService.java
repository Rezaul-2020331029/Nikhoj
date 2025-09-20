package reza.monolithicbackend.POST.services;




import reza.monolithicbackend.POST.domains.entities.Category;
import reza.monolithicbackend.POST.domains.entities.Specification;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    public List<Category> findAll();

    public Category findById(Long id);
    public Category findByName(String name);
    public List<Category> findByNameContaining(String name);

    public List<Specification>  getSpecificationsByCategoryName(String name);

    public Category createCategory(String name, List<String> specNames, String description, UUID uuid);


}
