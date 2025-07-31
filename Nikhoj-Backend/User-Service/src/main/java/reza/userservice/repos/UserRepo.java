package reza.userservice.repos;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.userservice.domain.entities.User;

import java.util.UUID;
@Repository
public interface UserRepo extends ListCrudRepository<User, UUID> {


    User findUserByEmail(String email);

    User findUserByPhone(String phone);
}
