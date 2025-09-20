package reza.textembedservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reza.textembedservice.bge_m3.TextEmbedRequest;
import reza.textembedservice.bge_m3.TextEmbedResponse;
import reza.textembedservice.bge_m3.TextEmbedService;
import reza.textembedservice.qdrant.QdrantService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/test")
public class TestController {

    QdrantService qdrantService;
    TextEmbedService textEmbedService;

    public TestController(QdrantService qdrantService, TextEmbedService textEmbedService) {
        this.qdrantService = qdrantService;
        this.textEmbedService = textEmbedService;
    }

    @PostMapping("/embed")
    public ResponseEntity<String> embedAndStore(
            @RequestBody TestTextEmbedReq request
    )
    {
        TextEmbedResponse textEmbedResponse = textEmbedService
                .textEmbed(new TextEmbedRequest(request.text())).getBody();

        List<List<Float>> vectors = new java.util.ArrayList<>(List.of());
        assert textEmbedResponse != null;
        vectors.add(textEmbedResponse.embedding());

        // Generate random UUID
        String randomId = UUID.randomUUID().toString();

        qdrantService.uploadPoint(
                request.collectionName(),
                randomId,
                vectors
        );

        return ResponseEntity.ok().body("Ok");
    }
}

