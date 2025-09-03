package org.vs.ecommerce.auth.dto;

import lombok.Data;

@Data
public class SignupRequestDto {
    private String username;
    private String email;
    private String password;
}