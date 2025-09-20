package reza.monolithicbackend.FaceEmbedding.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Base64RepresentRequest {
    private String base64Image;
    private String modelName;
}
