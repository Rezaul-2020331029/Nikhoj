package reza.textembedservice.bge_m3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class TextEmbedService {

    @Value("${text-embed.base-url:http://localhost:11434}")
    private String baseUrl;
    @Value("${text-embed.model:bge-m3}")
    private String model;

    private RestTemplate textEmbedRestTemplate;
    public TextEmbedService(RestTemplate textEmbedRestTemplate) {
        this.textEmbedRestTemplate = textEmbedRestTemplate;
    }

    public ResponseEntity<TextEmbedResponse> textEmbed(TextEmbedRequest textEmbedRequest) {

        String url = this.baseUrl + "//api/embeddings";

        // Create request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", this.model);
        requestBody.put("prompt", textEmbedRequest.text());

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // Make the request
        ResponseEntity<TextEmbedResponse> response = textEmbedRestTemplate.postForEntity(
                url, request, TextEmbedResponse.class);

        return response;



    }
}
