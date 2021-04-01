package com.logigear.crm.career.exception;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.core.annotation.AnnotationAwareOrderComparator;

import com.logigear.crm.career.exception.handler.AbstractExceptionHandler;

/**
 * Given an exception, builds a response.
 */
public class ErrorResponseComposer<T extends Throwable> {
	
	
	private final Map<String, AbstractExceptionHandler<T>> handlers;
	
	public ErrorResponseComposer(List<AbstractExceptionHandler<T>> handlers) {
		
		this.handlers = handlers.stream().collect(
	            Collectors.toMap(AbstractExceptionHandler::getExceptionName,
	            		Function.identity(), (handler1, handler2) -> {
	            			return AnnotationAwareOrderComparator .INSTANCE.compare(handler1, handler2) < 0 ? handler1 : handler2;
	            		}));
		
	}

	/**
	 * Given an exception, finds a handler for 
	 * building the response and uses that to build and return the response
	 */
	@SuppressWarnings("unchecked")
	public Optional<ErrorResponse> compose(T ex) {

		AbstractExceptionHandler<T> handler = null;
		
        // find a handler for the exception
        // if no handler is found,
        // loop into for its cause (ex.getCause())

		while (ex != null) {
			
			handler = handlers.get(ex.getClass().getSimpleName());
			
			if (handler != null) // found a handler
				break;
			
			ex = (T) ex.getCause();			
		}
        
        if (handler != null) // a handler is found    	
        	return Optional.of(handler.getErrorResponse(ex));
        
        return Optional.empty();
	}
}
