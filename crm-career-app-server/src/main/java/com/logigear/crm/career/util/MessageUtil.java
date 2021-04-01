package com.logigear.crm.career.util;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

public class MessageUtil {

	private static MessageSource messageSource;
	
	public MessageUtil(MessageSource messageSource ) {
		MessageUtil.messageSource = messageSource;
	}
	
	/**
	 * Gets a message from messages.properties
	 * 
	 * @param messageKey	the key of the message
	 * @param args			any arguments
	 */
	public static String getMessage(String messageKey, Object... args) {
		
		if (messageSource == null)
			return "ApplicationContext unavailable, probably unit test going on";
		
		// http://stackoverflow.com/questions/10792551/how-to-obtain-a-current-user-locale-from-spring-without-passing-it-as-a-paramete
		return messageSource.getMessage(messageKey, args, LocaleContextHolder.getLocale());
	}
}
