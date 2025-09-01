package org.vs.ecommerce.auth.model;

import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Test {

    @GeneratedValue
    private UUID id;

    private String name;

    private String email;

    private String password;
}
