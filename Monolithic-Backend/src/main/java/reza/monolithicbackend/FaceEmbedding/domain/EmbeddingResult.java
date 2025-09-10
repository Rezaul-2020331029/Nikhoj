package reza.monolithicbackend.FaceEmbedding.domain;

import lombok.Data;

@Data
public class EmbeddingResult {
    private float[] embedding;
    // Other fields like face_confidence and facial_area are ignored
}