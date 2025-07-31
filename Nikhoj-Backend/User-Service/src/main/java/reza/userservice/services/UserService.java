package reza.userservice.services;

import reza.userservice.domain.entities.Role;
import reza.userservice.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    public List<User> findAll();
    public List<User> findByName(String name);
    public List<User> findByEmail(String email);
    public List<User> findByRole(Role role);
    public List<User> findByRoleAndName(String role, String name);
    public List<User> findByRoleAndEmail(String role, String email);
    public User createUser(User user);
    public User deleteUser(User user);
    public User updateUser(User user);
    public User findUserById(UUID id);
    public User findUserByEmail(String email);
    public User findUserByPhone(String phone);
    public User changePassword(User user, String oldPassword, String newPassword);




}
