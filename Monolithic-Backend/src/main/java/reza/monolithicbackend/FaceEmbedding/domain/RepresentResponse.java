package reza.monolithicbackend.FaceEmbedding.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    @Builder
    public static class Result {
        @JsonProperty("embedding")
        private List<Float> embedding;

        @JsonProperty("face_confidence")
        private Float faceConfidence;

        @JsonProperty("facial_area")
        private FacialArea facialArea;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FacialArea {
        @JsonProperty("h")
        private Integer h;

        @JsonProperty("w")
        private Integer w;

        @JsonProperty("x")
        private Integer x;

        @JsonProperty("y")
        private Integer y;

        @JsonProperty("left_eye")
        private List<Integer> leftEye;

        @JsonProperty("right_eye")
        private List<Integer> rightEye;
    }
}