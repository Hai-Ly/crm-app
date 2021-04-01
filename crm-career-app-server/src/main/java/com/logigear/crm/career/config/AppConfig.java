package com.logigear.crm.career.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.hateoas.support.WebStack;
import org.springframework.web.server.adapter.ForwardedHeaderTransformer;

@Configuration
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL, stacks = WebStack.WEBFLUX)
public class AppConfig {

	/*
    @Bean
    public ResourceBundleMessageSource messageSource() {

    	ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasenames("messages/msg");
        source.setUseCodeAsDefaultMessage(true);

        return source;
    }*/
    
    @Bean
    ForwardedHeaderTransformer forwardedHeaderTransformer() {
        return new ForwardedHeaderTransformer();
    }
}
