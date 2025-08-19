package reza.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reza.authservice.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}
