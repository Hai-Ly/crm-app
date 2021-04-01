package com.logigear.crm.career.model;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.logigear.crm.career.model.audit.UserDateAudit;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "images")
@Getter @Setter @ToString
public class ImageDto extends UserDateAudit {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1980354049509422537L;

	@Id
	private String id;

	@NotBlank
	private String name;
	
	private long size;
	
	private String type;
	
	private String location;
	
	public ImageDto() {

	}

	public ImageDto(String name) {
		this.name = name;
	}	
}
