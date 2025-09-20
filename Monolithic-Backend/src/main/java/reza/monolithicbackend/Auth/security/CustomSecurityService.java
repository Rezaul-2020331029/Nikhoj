package reza.monolithicbackend.Auth.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;

@Component("securityService")
public class CustomSecurityService {

    public boolean hasUserAccess(UUID userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getDetails() instanceof Map) {
            Map<String, Object> details = (Map<String, Object>) auth.getDetails();
            UUID currentUserId = (UUID) details.get("userId");
            return userId.equals(currentUserId);
        }
        return false;
    }

    public boolean hasRoleAndUserAccess(String role, UUID userId) {
        return hasRole(role) && hasUserAccess(userId);
    }

    private boolean hasRole(String role) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role));
    }
}