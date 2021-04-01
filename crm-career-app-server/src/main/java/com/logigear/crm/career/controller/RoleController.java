package com.logigear.crm.career.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logigear.crm.career.payload.RoleResponse;
import com.logigear.crm.career.service.RoleService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
    @GetMapping
    public Flux<RoleResponse> getRoles() {
    	return roleService.getRoles().map(RoleResponse::new);
    }
    
}
