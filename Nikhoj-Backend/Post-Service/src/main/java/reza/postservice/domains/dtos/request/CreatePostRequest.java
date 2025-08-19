package reza.postservice.domains.dtos.request;

import jakarta.persistence.Column;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public class CreatePostRequest {

    private String title;
    private String description;
    private String category;
    private String postType;
    private String threadId;
    private List<MultipartFile> files;
    private Map<String,String> postSpecs;
    private String district;
    private String city;
    private String subDistrict;
    private String postOffice;
    private  String roadAddress;




}
