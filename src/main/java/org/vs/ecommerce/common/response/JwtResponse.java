package org.vs.ecommerce.common.response;

import lombok.Data;

import java.util.UUID;

@Data
public class JwtResponse {
    private UUID userId;
    private String token;
    private String type = "Bearer";

    public JwtResponse(UUID userId, String token) {
        this.userId = userId;
        this.token = token;
    }
}
