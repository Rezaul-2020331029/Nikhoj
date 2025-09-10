package reza.monolithicbackend.FaceEmbedding.domain;

import lombok.Data;

import java.util.List;

@Data
public class EmbeddingResponse {
    private List<EmbeddingResult> results;
}