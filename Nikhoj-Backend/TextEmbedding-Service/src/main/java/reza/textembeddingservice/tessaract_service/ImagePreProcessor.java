package reza.textembeddingservice.tessaract_service;

import java.io.File;

public class ImagePreProcessor {

    public static File preprocess(File inputFile) {
        Mat image = opencv_imgcodecs.imread(inputFile.getAbsolutePath());

        // Convert to grayscale
        Mat gray = new Mat();
        opencv_imgproc.cvtColor(image, gray, opencv_imgproc.COLOR_BGR2GRAY);

        // Threshold (binarization)
        Mat thresh = new Mat();
        opencv_imgproc.threshold(gray, thresh, 0, 255,
                opencv_imgproc.THRESH_BINARY | opencv_imgproc.THRESH_OTSU);

        // Save processed file
        File processed = new File(inputFile.getParent(), "processed.png");
        opencv_imgcodecs.imwrite(processed.getAbsolutePath(), thresh);

        return processed;
    }
}
