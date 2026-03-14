package com.movieapp.repository;

import com.movieapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByRole(String role);

    List<User> findByStatus(String status);

    List<User> findByEmailContaining(String emailPart);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
