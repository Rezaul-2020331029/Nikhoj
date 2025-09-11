package reza.monolithicbackend.Auth.dto;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reza.monolithicbackend.Auth.model.UserRole;
import reza.monolithicbackend.Auth.utils.Enums;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserResponse {



    private UUID id;
    private String name;
    private String email;
    private String imageUrl;
    private boolean emailVerified;
    private List<String> userRoles;

    private Date createdAt;

}
