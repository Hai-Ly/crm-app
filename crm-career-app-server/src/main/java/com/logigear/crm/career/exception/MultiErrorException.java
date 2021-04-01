package com.logigear.crm.career.exception;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.logigear.crm.career.util.MessageUtil;

public class MultiErrorException extends RuntimeException {

	private static final long serialVersionUID = 5766861745592675757L;

	// list of errors
	private List<FieldError> errors = new ArrayList<>(10);

	// HTTP Status code to be returned
	private HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

	public MultiErrorException httpStatus(HttpStatus status) {
		this.status = status;
		return this;
	}

	public List<FieldError> getErrors() {
		return errors;
	}

	public HttpStatus getStatus() {
		return status;
	}

	/**
	 * Adds a field-error if the given condition isn't true
	 */
	public MultiErrorException validateField(String fieldName, boolean valid, String messageKey, Object... args) {

		if (!valid)
			errors.add(new FieldError(fieldName, messageKey, MessageUtil.getMessage(messageKey, args)));

		return this;
	}

	/**
	 * Throws the exception, if there are accumulated errors
	 */
	public void go() {
		if (!errors.isEmpty())
			throw this;
	}

	/**
	 * Adds a global-error if the given condition isn't true
	 */
	public MultiErrorException validate(boolean valid, String messageKey, Object... args) {

		// delegate
		return validateField(null, valid, messageKey, args);
	}

	
	/**
	 * Overrides the standard getMessage
	 */
	@Override
	public String getMessage() {

		if (errors.isEmpty())
			return null;

		// return the first message
		return errors.get(0).getMessage();
	}
	
}
