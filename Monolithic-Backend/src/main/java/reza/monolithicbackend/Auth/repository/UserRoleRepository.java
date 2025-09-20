package reza.monolithicbackend.Auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reza.monolithicbackend.Auth.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}
