package org.vs.ecommerce.auth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue
    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "user_name", nullable = false)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "roles", nullable = false)
    private List<String> roles;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private String createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private String updatedAt;

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + username + '\'' +
                ", email='" + email + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                '}';
    }
}
