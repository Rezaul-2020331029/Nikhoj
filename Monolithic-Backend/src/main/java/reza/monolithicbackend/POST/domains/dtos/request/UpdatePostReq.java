package reza.monolithicbackend.POST.domains.dtos.request;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import reza.monolithicbackend.POST.domains.entities.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
public class UpdatePostReq {


    private UUID postId;
    private Post post;
    private String contactNumber;
    private String title;
    private String description;
    private Map<String, String> postSpecs;
    private String category;
    private String district;
    private String city;
    private String subDistrict;
    private String postOffice;
    private  String roadAddress;

    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.ONGOING;
}
