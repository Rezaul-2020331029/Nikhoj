package reza.monolithicbackend.POST.domains.dtos.advance;


import lombok.Data;
import java.util.List;
import java.util.UUID;

import lombok.Data;
import reza.monolithicbackend.POST.domains.entities.Report;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class PostDTO {
    private UUID postId;
    private UUID posterId;
    private String contactNumber;
    private String title;
    private String postType; // "LOST" or "FOUND"
    private String description;
    private List<Report> reports; // Use appropriate ReportDTO if available
    private List<ImageUrlDTO> imageUrls;
    private List<PostSpecDTO> postSpecs;
    private String category;
    private String district;
    private String city;
    private String subDistrict;
    private String postOffice;
    private String roadAddress;
    private String address;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String status; // "ONGOING" or "RESOLVED"
}