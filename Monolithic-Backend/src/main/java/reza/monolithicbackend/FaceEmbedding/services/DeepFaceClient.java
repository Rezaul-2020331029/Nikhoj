package reza.monolithicbackend.FaceEmbedding.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import reza.monolithicbackend.FaceEmbedding.domain.RepresentResponse;

import java.io.IOException;
import java.util.*;


@Slf4j
@Component
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

    public List<List<Float>> getEmbeddings(List<String> base64Images, String modelName) {
        String url = deepfaceBaseUrl + "/represent";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<List<Float>> embeddings = new ArrayList<>();

        for (int i = 0; i < base64Images.size(); i++) {
            try {
                Map<String, Object> body = new HashMap<>();
                String base64Image = base64Images.get(i);

                // Add data URL prefix if not already present
                if (!base64Image.startsWith("data:image/")) {
                    base64Image = "data:image/jpeg;base64," + base64Image;
                }

                body.put("img", base64Image);
                body.put("model_name", modelName);

                HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

                ResponseEntity<RepresentResponse> response = restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        requestEntity,
                        RepresentResponse.class
                );

                // Extract embedding directly as List<Float>
                if (response.getBody() != null &&
                        response.getBody().getResults() != null &&
                        !response.getBody().getResults().isEmpty()) {

                    List<Float> embedding = response.getBody().getResults().get(0).getEmbedding();
                    embeddings.add(embedding);
                    System.out.println(response.getBody());
                    System.out.println(embedding);
                }

                log.info("Successfully got embedding for image {} with model: {}", i + 1, modelName);

            } catch (Exception e) {
                log.error("Error processing image {} with DeepFace API: {}", i + 1, e.getMessage());
                throw new RuntimeException("Failed to get embedding for image " + (i + 1), e);
            }
        }

        return embeddings;
    }
}