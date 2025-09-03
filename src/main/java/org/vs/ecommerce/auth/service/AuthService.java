package org.vs.ecommerce.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vs.ecommerce.auth.dto.LoginRequestDto;
import org.vs.ecommerce.auth.dto.SignupRequestDto;
import org.vs.ecommerce.auth.model.Users;
import org.vs.ecommerce.auth.repository.UserRepository;
import org.vs.ecommerce.auth.security.UserPrincipal;
import org.vs.ecommerce.common.constants.ErrorMessages;
import org.vs.ecommerce.common.utils.JwtUtil;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final Logger log = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public Users signup(String role, SignupRequestDto signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()) != null) {
            throw new IllegalArgumentException(ErrorMessages.EMAIL_ALREADY_EXISTS);
        }

        Users newUser = new Users();
        newUser.setUsername(signupRequest.getUsername());
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        switch (role) {
            case "user" -> newUser.setRoles(List.of("USER"));
            case "seller" -> newUser.setRoles(List.of("SELLER", "USER"));
            case "admin" -> newUser.setRoles(List.of("ADMIN", "SELLER", "USER"));
            default -> throw new IllegalArgumentException(ErrorMessages.INVALID_ROLE);
        }

        Users savedUser = userRepository.save(newUser);
        log.info("User registered successfully userId={}", savedUser.getUserId());
        return savedUser;
    }

    public String login(LoginRequestDto loginRequest) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        if (!principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList()
                .contains(loginRequest.getRole())) {
            throw new SecurityException(ErrorMessages.UNAUTHORIZED);
        }

        String token = jwtUtil.generateTokenWithRole(principal, loginRequest.getRole());
        log.info("Login success for email={} as role={}", loginRequest.getEmail(), loginRequest.getRole());
        return token;
    }
}

