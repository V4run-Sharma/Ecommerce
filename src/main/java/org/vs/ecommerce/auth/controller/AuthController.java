package org.vs.ecommerce.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.vs.ecommerce.auth.model.Test;
import org.vs.ecommerce.common.response.ApiResponse;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @GetMapping(name = "Auth Test Success", path = "/testSuccess")
    public ResponseEntity<ApiResponse<Test>> testSuccess(@RequestParam UUID requestId) {

        ApiResponse<Test> response = ApiResponse.success(requestId, new Test(
                UUID.randomUUID(),
                "John Doe",
                "john.doe@email.com",
                "password123"
        ));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping(name = "Auth Test Failure", path = "/testFailure")
    public ResponseEntity<ApiResponse<Test>> testFailure(@RequestParam UUID requestId) {

        ApiResponse<Test> response = ApiResponse.failure(requestId, "AUTH-401", "Unauthorized access");
        response.setRequestId(UUID.randomUUID());

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }
}
