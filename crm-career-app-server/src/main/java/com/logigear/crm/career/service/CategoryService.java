package com.logigear.crm.career.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.logigear.crm.career.model.Category;
import com.logigear.crm.career.repository.CategoryRepository;
import com.logigear.crm.career.util.Util;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CategoryService {

	private CategoryRepository categoryRepository;

	public CategoryService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public Flux<Category> getCategories() {
		return categoryRepository.findAll();
	}
	
	public Mono<Category> findCategoryById(String id) {
		return categoryRepository.findById(id).switchIfEmpty(Util.notFoundMono());
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	public Mono<Category> newCategory(Category category) {
		return categoryRepository.save(category);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	public Mono<Category> updateCategory(String id, Category category) {
		return findCategoryById(id)
				.doOnNext(existedCategory -> {
					existedCategory.setName(category.getName());
				})
				.flatMap(categoryRepository::save);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')") 
    public Mono<Void> deleteCategory(String id) {
        return findCategoryById(id).flatMap(category -> categoryRepository.deleteById(category.getId()));
    }
	
}
