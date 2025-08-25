package reza.textembedservice.tesseract;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/ocr")
public class OcrController {

    private final OcrService ocrService;

    public OcrController(OcrService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping("/extract")
    public String extractText(@RequestParam("file") MultipartFile file) throws Exception {
        File tempFile = File.createTempFile("upload_", file.getOriginalFilename());
        file.transferTo(tempFile);

        try {
            return ocrService.extractText(tempFile);
        } finally {
            if (tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
}
