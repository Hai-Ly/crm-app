package com.logigear.crm.career.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.logigear.crm.career.validation.Password;
import com.logigear.crm.career.validation.UniqueEmail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

	@NotBlank
	@Size(min = 4, max = 40)
	private String name;

	@UniqueEmail
	private String email;

	@Password
	private String password;
	
}
