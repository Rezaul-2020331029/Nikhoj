package reza.imageembeddingservice.domain;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RepresentResponse {
    @JsonProperty("results")
    private List<Result> results;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Result {
        @JsonProperty("embedding")
        private List<Double> embedding;

        @JsonProperty("face_confidence")
        private Double faceConfidence;


    }


}