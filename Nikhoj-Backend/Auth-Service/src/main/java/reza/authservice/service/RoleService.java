package reza.authservice.service;


import org.springframework.stereotype.Service;
import reza.authservice.model.Role;
import reza.authservice.model.UserInfo;
import reza.authservice.model.UserRole;
import reza.authservice.repository.RoleRepository;
import reza.authservice.utils.Enums;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role getRoleByName(Enums.RoleType roleName) {
        System.out.println("getRoleByName " + roleName);
        return roleRepository.findByRole(roleName.name())
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    }

    public void giveRolesToUser(UserInfo user, List<Role> roles) {
        List<UserRole> userRoles = roles.stream()
                .map(role -> UserRole.builder()
                        .role(role)
                        .userInfo(user)
                        .build())
                .collect(Collectors.toList());

        user.setUserRoles(userRoles);
    }

}
