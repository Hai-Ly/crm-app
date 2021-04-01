package com.logigear.crm.career.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import com.logigear.crm.career.model.audit.AuditorAwareImpl;

@Configuration
@EnableMongoAuditing
public class AuditingConfig {
    
	 @Bean
	 public AuditorAware<String> auditorProvider() {
		 return new AuditorAwareImpl();
	 }
}