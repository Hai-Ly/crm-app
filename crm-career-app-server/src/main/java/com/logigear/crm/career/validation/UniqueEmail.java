package com.logigear.crm.career.validation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@NotBlank(message = "{com.logigear.crm.career.error.blank.email}")
@Size(min=4, max=250, message = "{com.logigear.crm.career.error.invalid.email.size}")
@Email(message = "{com.logigear.crm.career.error.invalid.email}")
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy=UniqueEmailValidator.class)
public @interface UniqueEmail {
 
    String message() default "{com.logigear.crm.career.error.duplicate.email}";

    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}
