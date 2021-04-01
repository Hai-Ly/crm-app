package com.logigear.crm.career.util;

import java.io.IOException;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.data.domain.AuditorAware;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;

import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.logigear.crm.career.exception.MultiErrorException;
import com.logigear.crm.career.model.User;
import com.logigear.crm.career.model.audit.AuditorAwareImpl;
import com.logigear.crm.career.security.UserPrincipal;

import reactor.core.publisher.Mono;

public class Util {

	private static Mono<Object> NOT_FOUND_MONO;
    private static AuditorAware<String> auditorAware;
	private static ObjectMapper objectMapper;
	
	@PostConstruct
	public void postConstruct() {
		NOT_FOUND_MONO = Mono.error(new MultiErrorException().httpStatus(HttpStatus.NOT_FOUND).validate(false, "com.logigear.crm.career.error.notFound"));
	}
	
	public Util(AuditorAware<String> auditorAware, ObjectMapper objectMapper) {
		Util.auditorAware = auditorAware;
		Util.objectMapper = objectMapper;
	}
	
	@SuppressWarnings("unchecked")
	public static <T> Mono<T> notFoundMono() {
		return (Mono<T>) NOT_FOUND_MONO;
	}
	
	/**
	 * Gets the current-user
	 */
	public static Mono<User> currentUser() {
		
		return ReactiveSecurityContextHolder.getContext()
				.map(context -> {
					Authentication authentication = context.getAuthentication();
					
					if (authentication == null ||
							!authentication.isAuthenticated() ||
							authentication instanceof AnonymousAuthenticationToken) {
				            return null;
				    }
	
				    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
				    return (User)userPrincipal;
				})
				.defaultIfEmpty(null);
	}
	
	
	public static Mono<Void> updateAuditor() {
		return currentUser().doOnNext(u -> {
			if(auditorAware instanceof AuditorAwareImpl) {
				if(u != null) {
					((AuditorAwareImpl) auditorAware).setAuditor(Optional.of(u.getId()));
				} else {
					((AuditorAwareImpl) auditorAware).setAuditor(Optional.empty());
				}
			}
		}).then();
	}
	

	@SuppressWarnings("unchecked")
	public static<T> T applyPatch(T originalObj, String patchString) {

		try {
			 // Parse the patch to JsonNode
	        JsonNode patchNode = objectMapper.readTree(patchString);

	        // Create the patch
	        JsonPatch patch = JsonPatch.fromJson(patchNode);

	        // Convert the original object to JsonNode
	        JsonNode originalObjNode = objectMapper.valueToTree(originalObj);

	        // Apply the patch
	        TreeNode patchedObjNode = patch.apply(originalObjNode);

	        // Convert the patched node to an updated obj
	        return objectMapper.treeToValue(patchedObjNode, (Class<T>) originalObj.getClass());
		} catch (IOException | JsonPatchException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static MultiErrorException validateField(String fieldName, boolean valid, String messageKey, Object... args) {
		return new MultiErrorException().validateField(fieldName, valid, messageKey, args);
	}
}
