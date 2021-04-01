package com.logigear.crm.career.validation;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.data.mongodb.core.MongoTemplate;

import com.logigear.crm.career.model.User;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

	private MongoTemplate mongoTemplate;

	public UniqueEmailValidator(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	@Override
	public boolean isValid(String email, ConstraintValidatorContext context) {
		return !mongoTemplate.exists(query(where("email").is(email)), User.class);
	}

}
