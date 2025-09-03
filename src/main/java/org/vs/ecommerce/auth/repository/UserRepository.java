package org.vs.ecommerce.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.vs.ecommerce.auth.model.Users;

import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Users findByEmail(String email);
}
