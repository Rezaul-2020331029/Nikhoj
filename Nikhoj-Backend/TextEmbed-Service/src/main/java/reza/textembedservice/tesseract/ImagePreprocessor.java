package reza.textembedservice.tesseract;



import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImagePreprocessor {

    public static File preprocess(File inputImage) throws IOException {
        BufferedImage img = ImageIO.read(inputImage);

        // 1. Convert to grayscale
        BufferedImage gray = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g = gray.createGraphics();
        g.drawImage(img, 0, 0, null);
        g.dispose();

        // 2. Apply simple binary thresholding (manual Otsu not needed for most cases)
        BufferedImage binary = new BufferedImage(gray.getWidth(), gray.getHeight(), BufferedImage.TYPE_BYTE_BINARY);
        Graphics2D g2 = binary.createGraphics();
        g2.drawImage(gray, 0, 0, null);
        g2.dispose();

        // Save to temp file
        File processedFile = File.createTempFile("ocr_processed_", ".png");
        ImageIO.write(binary, "png", processedFile);

        return processedFile;
    }
}