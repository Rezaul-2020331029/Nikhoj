package reza.monolithicbackend.POST.services.impl;

import org.springframework.stereotype.Service;
import reza.monolithicbackend.POST.domains.entities.Category;
import reza.monolithicbackend.POST.domains.entities.Specification;
import reza.monolithicbackend.POST.repos.CategoryRepo;
import reza.monolithicbackend.POST.repos.SpecificationRepo;
import reza.monolithicbackend.POST.services.CategoryService;


import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {


    private CategoryRepo categoryRepo;
    private SpecificationRepo specificationRepo;

    public CategoryServiceImpl(CategoryRepo categoryRepo, SpecificationRepo specificationRepo) {
        this.categoryRepo = categoryRepo;
        this.specificationRepo = specificationRepo;
    }

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
        System.out.println("Searching for category: '" + name + "'");

        Category category = categoryRepo.findCategoryByName(name);

        if (category == null) {
            System.out.println("Category not found!");
            return List.of();
        }

        System.out.println("Found category: " + category.getName());
        return category.getSpecifications();
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
