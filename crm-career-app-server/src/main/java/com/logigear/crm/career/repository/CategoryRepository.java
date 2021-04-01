package com.logigear.crm.career.repository;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.logigear.crm.career.model.Category;

@Repository
public interface CategoryRepository extends ReactiveMongoRepository<Category, String> {
	
   
}