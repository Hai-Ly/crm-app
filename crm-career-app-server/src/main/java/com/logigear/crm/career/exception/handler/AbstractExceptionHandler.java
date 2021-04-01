package com.logigear.crm.career.exception.handler;

import java.util.Collection;

import org.springframework.http.HttpStatus;

import com.logigear.crm.career.exception.ErrorResponse;
import com.logigear.crm.career.exception.FieldError;

public abstract class AbstractExceptionHandler<T extends Throwable> {
	
	private String exceptionName;
	
	public AbstractExceptionHandler(String exceptionName) {
		this.exceptionName = exceptionName;
	}

	public String getExceptionName() {
		return exceptionName;
	}
	
	protected String getMessage(T ex) {
		return ex.getMessage();
	}
	
	protected HttpStatus getStatus(T ex) {
		return null;
	}
	
	protected Collection<FieldError> getErrors(T ex) {
		return null;
	}

	public ErrorResponse getErrorResponse(T ex) {
		
		ErrorResponse errorResponse = new ErrorResponse();
		
		errorResponse.setMessage(getMessage(ex));
		
		HttpStatus status = getStatus(ex);
		if (status != null) {
			errorResponse.setStatus(status.value());
			errorResponse.setError(status.getReasonPhrase());
		}
		
		errorResponse.setErrors(getErrors(ex));
		
		return errorResponse;
	}
}