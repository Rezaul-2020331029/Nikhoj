package reza.monolithicbackend.POST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reza.monolithicbackend.Auth.service.AuthenticationService;
import reza.monolithicbackend.POST.domains.dtos.request.CreateCategoryReq;
import reza.monolithicbackend.POST.domains.dtos.request.GetSpecsReq;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;
import reza.monolithicbackend.POST.domains.entities.Category;
import reza.monolithicbackend.POST.domains.entities.Specification;
import reza.monolithicbackend.POST.services.CategoryService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/guest/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final AuthenticationService  authenticationService;
    public CategoryController(CategoryService categoryService, AuthenticationService authenticationService) {
        this.categoryService = categoryService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createCategory(@RequestBody CreateCategoryReq req) {

        try {


            categoryService.createCategory(
                    req.getName(),
                    req.getSpecNames(),
                    req.getDescription(),
                    UUID.randomUUID()
            );

            BaseResponse response = BaseResponse.builder()
                    .statusCode("201")
                    .status("SUCCESS")
                    .message("Category created successfully")
                    .build();

            return ResponseEntity.status(201).body(response);

        } catch (Exception e) {
            BaseResponse errorResponse = BaseResponse.builder()
                    .statusCode("500")
                    .status("ERROR")
                    .message("Failed to create category: " + e.getMessage())
                    .build();

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/specs")
    public ResponseEntity<BaseResponse> getSpecs(@RequestBody GetSpecsReq req) {
        try {
            List<Specification> specs = categoryService.getSpecificationsByCategoryName(req.getName());
            System.out.println(specs);

            List<String> specNames = specs.stream()
                    .map(Specification::getName)
                    .toList();
            System.out.println(specNames);

            BaseResponse response = BaseResponse.builder()
                    .statusCode("200")
                    .status("SUCCESS")
                    .message("Specifications retrieved successfully")
                    .payload(specNames)
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            BaseResponse errorResponse = BaseResponse.builder()
                    .statusCode("500")
                    .status("ERROR")
                    .message("Failed to retrieve specifications: " + e.getMessage())
                    .build();

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/")
    public ResponseEntity<BaseResponse<List<Category>, String>> getCategories() {
        try {
            List<Category> categories = categoryService.findAll();
            return BaseResponse.success("Categories retrieved successfully", categories);
        } catch (Exception e) {
            return BaseResponse.error("Failed to retrieve categories: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

}
