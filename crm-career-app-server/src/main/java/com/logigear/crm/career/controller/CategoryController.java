package com.logigear.crm.career.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logigear.crm.career.model.Category;
import com.logigear.crm.career.service.CategoryService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping
	public Flux<Category> getCategories() {
		return categoryService.getCategories();
	}
	
	@PostMapping
    public Mono<Category> createCategory(@Valid @RequestBody Category course) {
        return categoryService.newCategory(course);
    }
	
	@GetMapping("/{id}")
	public Mono<ResponseEntity<Category>> getCategoryById(@PathVariable String id) {
		return categoryService.findCategoryById(id).map(course -> ResponseEntity.ok(course))
				.defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PutMapping("/{id}")
	public Mono<Category> updateCategory(@PathVariable String id, @Valid @RequestBody Category course) {
		return categoryService.updateCategory(id, course);
	}

	@DeleteMapping("/{id}") 
    public Mono<Void> deleteCategory(@PathVariable String id) {
		 return categoryService.deleteCategory(id);
    }
}
