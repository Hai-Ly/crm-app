package com.logigear.crm.career.model;


import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.logigear.crm.career.model.audit.UserDateAudit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "products")
@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class Product extends UserDateAudit {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6195409327296599079L;

	@Id
    private String id;
 
	@NotBlank
	private String name;
    
    @NotBlank
    private String description;
    
    private Category[] category;
    
}
