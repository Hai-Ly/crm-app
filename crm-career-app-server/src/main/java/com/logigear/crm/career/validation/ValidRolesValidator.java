package com.logigear.crm.career.validation;

import java.util.Collection;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.logigear.crm.career.service.RoleService;

public class ValidRolesValidator implements ConstraintValidator<ValidRoles, Collection<String>> {

    @Override
    public boolean isValid(Collection<String> collection, ConstraintValidatorContext context) {
        return collection.stream().allMatch(RoleService.VALID_ROLES::contains);
    }

}