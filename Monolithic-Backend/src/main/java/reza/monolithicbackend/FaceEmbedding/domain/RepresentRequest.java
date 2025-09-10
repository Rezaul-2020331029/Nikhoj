package reza.monolithicbackend.FaceEmbedding.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepresentRequest {
    private String img; // Can be file path or base64
    private String modelName;
}