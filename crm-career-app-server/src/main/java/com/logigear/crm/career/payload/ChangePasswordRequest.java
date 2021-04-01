package com.logigear.crm.career.payload;

import com.logigear.crm.career.validation.Password;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
	@Password
	private String oldPassword;

	@Password
	private String password;
}
