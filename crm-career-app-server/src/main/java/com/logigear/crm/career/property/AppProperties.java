package com.logigear.crm.career.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix="crm")
@Getter @Setter
public class AppProperties {

	/**
	 * Client web application's base URL.
	 * Used in the verification link mailed to the users, etc.
	 */
    private String applicationUrl = "http://localhost:4200";
 
    /**
  	 * Properties related to the initial Admin user to be created
  	 */
  	private Admin admin = new Admin();
  	
  	/**
	 * JWT token generation related properties
	 */
  	private Jwt jwt;
  	
  	/**
  	 * All files uploaded through the REST API will be stored in this directory
  	 */
  	private String uploadDir;
	/**
	 * Properties regarding the initial Admin user to be created
	 * 
	 * @author Sanjay Patel
	 */
	@Getter @Setter
	public static class Admin {
		
		/**
		 * Login ID of the initial Admin user to be created 
		 */
		private String email;
		
		/**
		 * Password of the initial Admin user to be created 
		 */		
		private String password;
		
		/**
		 * Name of the initial Admin user to be created 
		 */		
		private String name;
	}
	
	/**
	 * Properties related to JWT token generation
	 * 
	 * @author Sanjay Patel
	 */
	@Getter @Setter
	public static class Jwt {
		
		/**
		 * Secret for signing JWT
		 */
		private String secret;
		
		/**
		 * Default expiration milliseconds
		 */
		private long expirationMillis = 864000000L; // 10 days
		
		/**
		 * Expiration milliseconds for short-lived tokens and cookies
		 */
		private int shortLivedMillis = 120000; // Two minutes
	}	
}
