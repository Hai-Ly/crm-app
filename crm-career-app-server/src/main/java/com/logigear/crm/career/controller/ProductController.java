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

import com.logigear.crm.career.model.Product;
import com.logigear.crm.career.service.ProductService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public Flux<Product> getProducts() {
		return productService.getProducts();
	}
	
	@PostMapping
    public Mono<Product> createProduct(@Valid @RequestBody Product prod) {
        return productService.newProduct(prod);
    }
	
	@GetMapping("/{id}")
	public Mono<ResponseEntity<Product>> getProductById(@PathVariable String id) {
		return productService.findProductById(id).map(prod -> ResponseEntity.ok(prod))
				.defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PutMapping("/{id}")
	public Mono<Product> updateProduct(@PathVariable String id, @Valid @RequestBody Product prod) {
		return productService.updateProduct(id, prod);
	}

	@DeleteMapping("/{id}") 
    public Mono<Void> deleteProduct(@PathVariable String id) {
		 return productService.deleteProduct(id);
    }
}
