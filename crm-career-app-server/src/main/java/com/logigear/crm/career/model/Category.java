package com.logigear.crm.career.model;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "categories")
@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class Category {

	@Id
    private String id;
 
	@NotBlank
	private String name;
}
