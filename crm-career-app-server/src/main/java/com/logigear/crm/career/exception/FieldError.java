package com.logigear.crm.career.exception;

public class FieldError {

	// Name of the field. Null in case of a form level error.
	private String field;

	// Error code. Typically the I18n message-code.
	private String code;

	// Error message
	private String message;

	public FieldError(String field, String code, String message) {
		this.field = field;
		this.code = code;
		this.message = message;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
}
