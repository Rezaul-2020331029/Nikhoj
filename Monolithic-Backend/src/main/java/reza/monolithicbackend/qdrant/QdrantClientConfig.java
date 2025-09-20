package reza.monolithicbackend.qdrant;


import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class QdrantClientConfig {

    @Value("${qdrant.key}")
    private String apiKey;

    @Value("${qdrant.url}")
    private String qdrantUrl;

    @Bean
    public QdrantClient qdrantClient() {


        return new QdrantClient(
                QdrantGrpcClient.newBuilder(qdrantUrl,6334,true)
                        .withApiKey(apiKey).
                        build()
        );

    }
}
