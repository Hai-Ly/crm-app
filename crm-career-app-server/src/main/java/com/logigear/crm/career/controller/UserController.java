package com.logigear.crm.career.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.logigear.crm.career.model.User;
import com.logigear.crm.career.payload.ChangePasswordRequest;
import com.logigear.crm.career.payload.UserResponse;
import com.logigear.crm.career.security.CurrentUser;
import com.logigear.crm.career.service.UserService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
    @GetMapping
    public Flux<UserResponse> getUsers(@RequestParam(name = "limit", required = false, defaultValue = "-1") long limit) { 
    	return userService.getUsers(limit).map(UserResponse::new);
    }
    
	@GetMapping("/{id}")
	public Mono<UserResponse> getUserById(@PathVariable String id, ServerHttpResponse response) {
    	return userService.userWithToken(userService.findUserById(id), response).map(UserResponse::new);
	}

	@PatchMapping(value = "/{id}")
	public Mono<UserResponse> updateUser(
			@CurrentUser Mono<User> currentUser,
			@PathVariable String id,
			@RequestBody @NotBlank Mono<String> patch,
			ServerHttpResponse response) {
		
		return userService.userWithToken(userService.updateUser(currentUser, id, patch), response).map(UserResponse::new);
	}

	@PostMapping("/users/{id}/password")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public Mono<Void> changePassword(@PathVariable String id,
			@Valid @RequestBody Mono<ChangePasswordRequest> changePasswordRequest,
			ServerHttpResponse response) {
		
		return userService.userWithToken(userService.changePassword(id, changePasswordRequest), response).then();
	}

	// TODO:
	/*
	@PostMapping("/users/{id}/email")
	public Mono<User> changeEmail( @PathVariable("id") String id, ServerWebExchange exchange) {
		
		return userService.userWithToken(userService.changeEmail(id, exchange.getFormData()), exchange.getResponse());
	}*/

	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> deleteUser(@PathVariable("id") String id) {
		return userService.findUserById(id)
				.flatMap(
					existingUser -> userService.deleteUser(id).then(Mono.just(new ResponseEntity<Void>(HttpStatus.OK)))
				)
				.defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
