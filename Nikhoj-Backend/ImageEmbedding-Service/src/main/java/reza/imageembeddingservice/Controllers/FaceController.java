package reza.imageembeddingservice.Controllers;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reza.imageembeddingservice.domain.Base64RepresentRequest;
import reza.imageembeddingservice.domain.RepresentResponse;
import reza.imageembeddingservice.services.DeepFaceClient;

import java.io.IOException;

@Log4j2
@RestController
@RequestMapping("/api/face")
@RequiredArgsConstructor
public class FaceController {

    private final DeepFaceClient deepFaceClient;

//    @PostMapping("/represent/base64")
//    public ResponseEntity<RepresentResponse> representBase64(@RequestBody Base64RepresentRequest request) {
//        RepresentResponse response = deepFaceClient.representFromBase64(
//                request.getBase64Image(),
//                request.getModelName()
//        );
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/represent")
    public ResponseEntity<RepresentResponse> getImageRepresentation(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "model_name", defaultValue = "VGG-Face") String modelName) {

        try {
            if (file.isEmpty()) {
                log.error("Uploaded file is empty");
                return ResponseEntity.badRequest().build();
            }

            log.info("Processing image representation for file: {} with model: {}",
                    file.getOriginalFilename(), modelName);

            RepresentResponse response = deepFaceClient.getRepresentation(file, modelName);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            log.error("Error processing file: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
