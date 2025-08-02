package reza.imageembeddingservice.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import reza.imageembeddingservice.domain.RepresentResponse;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class DeepFaceClient {

    private final RestTemplate restTemplate;
    private final String deepfaceBaseUrl = "http://localhost:6500";

    public DeepFaceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public RepresentResponse getRepresentation(MultipartFile imageFile, String modelName ) throws IOException {
        String url = deepfaceBaseUrl + "/represent";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        String base64Image = Base64.getEncoder().encodeToString(imageFile.getBytes());
        body.put("img", "data:image/jpeg;base64," + base64Image);
        body.put("model_name", modelName);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            // First get as String to see the actual response structure
//            ResponseEntity<String> stringResponse = restTemplate.exchange(
//                    url,
//                    HttpMethod.POST,
//                    requestEntity,
//                    String.class
//            );
//
//            log.info("Raw API response: {}", stringResponse.getBody());

            // Then try to parse as RepresentResponse
            ResponseEntity<RepresentResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    RepresentResponse.class
            );

            log.info("Successfully got representation for image with model: {}", modelName);
            return response.getBody();

        } catch (Exception e) {
            log.error("Error calling DeepFace represent API: {}", e.getMessage());
            throw new RuntimeException("Failed to get image representation", e);
        }
    }
}