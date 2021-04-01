package com.logigear.crm.career.exception.handler;

import org.springframework.core.annotation.Order;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class AccessDeniedExceptionHandler extends AbstractExceptionHandler<AccessDeniedException> {

	public AccessDeniedExceptionHandler() {
		
		super(AccessDeniedException.class.getSimpleName());
	}
	
	@Override
	public HttpStatus getStatus(AccessDeniedException ex) {
		return HttpStatus.FORBIDDEN;
	}
	
}
