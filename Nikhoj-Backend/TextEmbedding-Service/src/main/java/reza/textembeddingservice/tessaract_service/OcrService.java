package reza.textembeddingservice.tessaract_service;



public class OcrService {

    private final ITesseract tesseract;

    public OcrService() {
        this.tesseract = new Tesseract();
        String tessDataPath = getClass().getClassLoader().getResource("tessdata").getPath();
        tesseract.setDatapath(tessDataPath);
        tesseract.setLanguage("ben+eng"); // Bangla + English
        tesseract.setOcrEngineMode(1);    // LSTM only
        tesseract.setPageSegMode(3);


    }
}
