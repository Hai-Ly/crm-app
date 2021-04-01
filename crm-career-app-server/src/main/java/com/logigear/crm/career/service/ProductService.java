package com.logigear.crm.career.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.logigear.crm.career.model.Product;
import com.logigear.crm.career.repository.ProductRepository;
import com.logigear.crm.career.util.Util;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProductService {

	private ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public Flux<Product> getProducts() {
		return productRepository.findAll();
	}
	
	public Mono<Product> findProductById(String id) {
		return productRepository.findById(id).switchIfEmpty(Util.notFoundMono());
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	public Mono<Product> newProduct(Product product) {
		return productRepository.save(product);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	public Mono<Product> updateProduct(String id, Product product) {
		return findProductById(id)
				.doOnNext(existedProduct -> {
					existedProduct.setName(product.getName());
					existedProduct.setDescription(product.getDescription());
					existedProduct.setCategory(product.getCategory());
				})
				.flatMap(productRepository::save);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')") 
    public Mono<Void> deleteProduct(String id) {
        return findProductById(id).flatMap(product -> productRepository.deleteById(product.getId()));
    }
	
}
