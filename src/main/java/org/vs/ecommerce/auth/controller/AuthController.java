package org.vs.ecommerce.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.vs.ecommerce.auth.model.Users;
import org.vs.ecommerce.common.constants.ErrorCodes;
import org.vs.ecommerce.common.constants.ErrorMessages;
import org.vs.ecommerce.common.response.ApiResponse;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @GetMapping(name = "Auth Test Success", path = "/testSuccess")
    public ResponseEntity<ApiResponse<Users>> testSuccess(@RequestParam UUID requestId) {

        Users customer = new Users();
        customer.setUserId(UUID.randomUUID());
        customer.setUsername("testuser");
        customer.setEmail("testuser@email.com");
        customer.setPassword("testuser123");
        customer.setRoles(List.of("ROLE_SELLER", "ROLE_USER"));
        customer.setCreatedAt(new Date().toString());
        customer.setUpdatedAt(new Date().toString());
        ApiResponse<Users> response = ApiResponse.success(requestId, customer);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping(name = "Auth Test Failure", path = "/testFailure")
    public ResponseEntity<ApiResponse<Users>> testFailure(@RequestParam UUID requestId) {

        ApiResponse<Users> response = ApiResponse.failure(requestId, ErrorCodes.AUTH_401, ErrorMessages.UNAUTHORIZED);
        response.setRequestId(UUID.randomUUID());

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }
}
