package reza.textembedservice.tesseract;


import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.util.Objects;

@Configuration
public class TessConfig {

    @Bean
    public ITesseract tesseract() {
        Tesseract tesseract = new Tesseract();
        File tessDataFolder = new File(
                getClass().getClassLoader().getResource("tessdata").getFile()
        );
        tesseract.setDatapath(tessDataFolder.getPath());
        tesseract.setLanguage("ben+eng"); // Bangla + English
        tesseract.setOcrEngineMode(3);    // LSTM only
        tesseract.setPageSegMode(3);

        return tesseract;
    }
}
