package com.logigear.crm.career.validation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NotBlank(message="{com.logigear.crm.career.error.blank.password}")
@Size(min=8, max=20, message="{com.logigear.crm.career.error.invalid.password.size}")
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { })
public @interface Password {
	
	String message() default "{com.logigear.crm.career.error.invalid.password.size}";
	Class<?>[] groups() default { };
	Class<? extends Payload>[] payload() default { };
}