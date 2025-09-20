package reza.monolithicbackend.Auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reza.monolithicbackend.Auth.model.Role;


import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRole(String name);
}
