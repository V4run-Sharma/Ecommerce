package org.vs.ecommerce.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.vs.ecommerce.auth.dto.LoginRequestDto;
import org.vs.ecommerce.auth.dto.SignupRequestDto;
import org.vs.ecommerce.auth.model.Users;
import org.vs.ecommerce.auth.service.AuthService;
import org.vs.ecommerce.common.constants.ErrorCodes;
import org.vs.ecommerce.common.constants.ErrorMessages;
import org.vs.ecommerce.common.response.ApiResponse;
import org.vs.ecommerce.common.response.JwtResponse;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/{role}/signup")
    public ResponseEntity<ApiResponse<String>> signup(@PathVariable String role,
                                                      @RequestParam UUID requestId,
                                                      @RequestBody SignupRequestDto signupRequest) {
        try {
            log.info("Signup attempt for email={}", signupRequest.getEmail());
            Users savedUser = authService.signup(role, signupRequest);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ApiResponse.success(requestId, savedUser.getEmail()));
        } catch (IllegalArgumentException e) {
            log.warn("Signup failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.failure(requestId, ErrorCodes.AUTH_400, e.getMessage()));
        } catch (Exception e) {
            log.error("Signup failed for email={} error={}", signupRequest.getEmail(), e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.failure(requestId, ErrorCodes.GEN_500, ErrorMessages.SERVER_ERROR));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> login(@RequestParam UUID requestId,
                                                          @RequestBody LoginRequestDto loginRequest) {
        try {
            log.info("Login attempt for email={}", loginRequest.getEmail());
            Pair<UUID, String> idToken= authService.login(loginRequest);

            return ResponseEntity.ok(ApiResponse.success(requestId, new JwtResponse(idToken.getFirst(), idToken.getSecond())));
        } catch (BadCredentialsException e) {
            log.warn("Login failed (bad credentials) email={}", loginRequest.getEmail());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.failure(requestId, ErrorCodes.AUTH_401, ErrorMessages.UNAUTHORIZED));
        } catch (SecurityException e) {
            log.warn("Login failed (unauthorized role) email={}", loginRequest.getEmail());
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.failure(requestId, ErrorCodes.AUTH_403, e.getMessage()));
        } catch (Exception e) {
            log.error("Login failed for email={} error={}", loginRequest.getEmail(), e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.failure(requestId, ErrorCodes.GEN_500, ErrorMessages.SERVER_ERROR));
        }
    }

}
