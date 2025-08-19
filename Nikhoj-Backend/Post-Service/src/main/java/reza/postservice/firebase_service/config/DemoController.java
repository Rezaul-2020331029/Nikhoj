package reza.postservice.firebase_service.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/demo")
public class DemoController {

    FireBaseService firebaseService;

    public DemoController(FireBaseService firebaseService) {
        this.firebaseService = firebaseService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> create( @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(firebaseService.uploadFile(file));
    }


}
