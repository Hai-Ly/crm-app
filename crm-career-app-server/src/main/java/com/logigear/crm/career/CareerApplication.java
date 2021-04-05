package com.logigear.crm.career;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.logigear.crm.career.property.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class CareerApplication {
	
	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(CareerApplication.class);
        springApplication.setWebApplicationType(WebApplicationType.REACTIVE);
        springApplication.run(args);
	}

}
