package reza.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reza.authservice.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRole(String name);
}
