package reza.postservice.services.impl;

import org.springframework.stereotype.Service;
import reza.postservice.domains.entities.Category;
import reza.postservice.domains.entities.Specification;
import reza.postservice.repos.CategoryRepo;
import reza.postservice.repos.SpecificationRepo;
import reza.postservice.services.CategoryService;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {


    private CategoryRepo categoryRepo;
    private SpecificationRepo specificationRepo;

    @Override
    public List<Category> findAll() {
        return List.of();
    }

    @Override
    public Category findById(Long id) {
        return null;
    }

    @Override
    public Category findByName(String name) {

        return categoryRepo.getCategoryByName(name);

    }

    @Override
    public List<Category> findByNameContaining(String name) {
        return List.of();
    }

    @Override
    public List<Specification> getSpecificationsByCategoryName(String name) {



        return specificationRepo.getSpecificationByCategory_Name(name);
    }

    @Override
    public Category createCategory(String name, List<String> specNames, String description, UUID uuid) {
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        category.setCreatorId(uuid);

        // Create specifications for this category
        List<Specification> specifications = specNames.stream()
                .map(specName -> {
                    Specification spec = new Specification();
                    spec.setName(specName);
                    spec.setCategory(category);
                    return spec;
                })
                .toList();

        category.setSpecifications(specifications);
        return categoryRepo.save(category);

    }








}
