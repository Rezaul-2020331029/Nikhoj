package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Data
public class CreatePostRequest {
    private String title;
    private String description;
    private String category;
    private String postType;
    private String threadId;
    private String contactNumber;
    private List<String> files; // Changed to List<String> for Base64
    private Map<String, String> postSpecs;
    private String district;
    private String city;
    private String subDistrict;
    private String postOffice;
    private String roadAddress;
}