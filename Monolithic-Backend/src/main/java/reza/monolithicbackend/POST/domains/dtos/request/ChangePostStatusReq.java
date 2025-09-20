package reza.monolithicbackend.POST.domains.dtos.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;
import reza.monolithicbackend.POST.domains.entities.PostStatus;

import java.util.UUID;

@Data
@NoArgsConstructor
public class ChangePostStatusReq {

    @Enumerated(EnumType.STRING)
    private PostStatus postStatus;
    private UUID postId;
}
