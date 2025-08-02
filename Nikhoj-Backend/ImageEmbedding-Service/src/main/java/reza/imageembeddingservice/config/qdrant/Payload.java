package reza.imageembeddingservice.config.qdrant;
import static io.qdrant.client.ValueFactory.value;



import io.qdrant.client.grpc.JsonWithInt;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class Payload {

    Map<String, JsonWithInt.Value> data;
    String postId;
    String type;
    Double confidence;
    String category;
    LocalDateTime createdAt;




    public Payload(String postId, String type, Double confidence, String category) {

        this.postId = postId;
        this.type = type;
        this.confidence = confidence;
        this.category = category;
        this.createdAt = LocalDateTime.now();

    }

    public Map<String, JsonWithInt.Value> asMap() {
        data.put("post_id", value(postId));
        data.put("type",value(type));
        data.put("confidence",value(confidence));
        data.put("category",value(category));
        data.put("created_at",value(String.valueOf(LocalDateTime.now())));

        return data;
    }


}
