package reza.textembedservice.tesseract;


import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class OcrService {

    private final ITesseract tesseract;

    public OcrService(ITesseract tesseract) {
        this.tesseract = tesseract;
    }

    public String extractText(File imageFile) {
        File processed = null;
        try {
//            processed = ImagePreprocessor.preprocess(imageFile);
            processed = imageFile;
            return tesseract.doOCR(processed);
        } catch (TesseractException e) {
            throw new RuntimeException("OCR failed", e);
        } finally {
            if (processed != null && processed.exists()) {
                processed.delete();
            }
        }
    }
}
