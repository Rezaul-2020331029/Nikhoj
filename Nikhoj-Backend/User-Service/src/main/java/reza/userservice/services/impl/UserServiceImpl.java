package reza.userservice.services.impl;

import org.springframework.stereotype.Service;
import reza.userservice.domain.entities.Role;
import reza.userservice.domain.entities.User;
import reza.userservice.errohandlers.errors.user_register.UserRegistrationException;
import reza.userservice.repos.UserRepo;
import reza.userservice.services.UserService;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    @Override
    public List<User> findAll() {
        return List.of();
    }

    @Override
    public List<User> findByName(String name) {
        return List.of();
    }

    @Override
    public List<User> findByEmail(String email) {
        return List.of();
    }

    @Override
    public List<User> findByRole(Role role) {
        return List.of();
    }

    @Override
    public List<User> findByRoleAndName(String role, String name) {
        return List.of();
    }

    @Override
    public List<User> findByRoleAndEmail(String role, String email) {
        return List.of();
    }

    @Override
    public User createUser(User user) {
        // Check if email already exists
        User existingUserByEmail = userRepo.findUserByEmail(user.getEmail());
        if (existingUserByEmail != null) {
            // Check if phone also exists
            User existingUserByPhone = userRepo.findUserByPhone(user.getPhone());
            if (existingUserByPhone != null) {
                throw new UserRegistrationException(
                        "User already exists with both email and phone number",
                        "EMAIL_PHONE_EXISTS"
                );
            }
            throw UserRegistrationException.emailExists();
        }

        // Check if phone already exists (independent of email check)
        User existingUserByPhone = userRepo.findUserByPhone(user.getPhone());
        if (existingUserByPhone != null) {
            throw new UserRegistrationException(
                    "Phone number already exists",
                    "PHONE_EXISTS"
            );
        }

        // Validate user data
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new UserRegistrationException("Email is required", "EMAIL_REQUIRED");
        }

        if (user.getPassword() == null || user.getPassword().length() < 8) {
            throw new  UserRegistrationException("Password is required to be greater than 8 char", "PASSWORD_REQUIRED");
        }

        try {

            return userRepo.save(user);
        } catch (Exception e) {
            throw new UserRegistrationException(
                    "Failed to create user due to server error",
                    "SERVER_ERROR",
                    e
            );
        }
    }

    @Override
    public User deleteUser(User user) {
        return null;
    }

    @Override
    public User updateUser(User user) {
        return null;
    }

    @Override
    public User findUserById(UUID id) {
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public User findUserByPhone(String phone) {
        return null;
    }

    @Override
    public User changePassword(User user, String oldPassword, String newPassword) {
        return null;
    }
}
