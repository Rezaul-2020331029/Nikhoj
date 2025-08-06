package reza.imageembeddingservice.config.qdrant;

import static io.qdrant.client.ConditionFactory.*;
import static io.qdrant.client.PointIdFactory.id;

import com.google.common.util.concurrent.ListenableFuture;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.grpc.Collections;
import io.qdrant.client.grpc.Points;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class QdrantService {

    public QdrantClient qdrantClient;

    public QdrantService(QdrantClient qdrantClient) {
        this.qdrantClient = qdrantClient;
    }

    public void createFaceCollection(String collectionName,
                                 int size) throws ExecutionException, InterruptedException {

        Map<String, Collections.VectorParams> vectors = new HashMap<>();
        vectors.put("img_1",
                Collections.VectorParams.newBuilder().setSize(size).setDatatype(Collections.Datatype.Float32)
                        .setDistance(Collections.Distance.Cosine).build()
                );
        vectors.put("img_2",
                Collections.VectorParams.newBuilder().setSize(size).setDatatype(Collections.Datatype.Float32)
                        .setDistance(Collections.Distance.Cosine).build()
        );

        vectors.put("img_3",
                Collections.VectorParams.newBuilder().setSize(size).setDatatype(Collections.Datatype.Float32)
                        .setDistance(Collections.Distance.Cosine).build()
        );

        vectors.put("img_4",
                Collections.VectorParams.newBuilder().setSize(size).setDatatype(Collections.Datatype.Float32)
                        .setDistance(Collections.Distance.Cosine).build()
        );
        vectors.put("img_5",
                Collections.VectorParams.newBuilder().setSize(size).setDatatype(Collections.Datatype.Float32)
                        .setDistance(Collections.Distance.Cosine).build()
        );


        int maxRetries = 3;
        int attempt = 0;
        while (attempt < maxRetries) {
            try {
                ListenableFuture<Collections.CollectionOperationResponse> future =
                        qdrantClient.createCollectionAsync(collectionName, vectors);
                future.get(); // Wait for completion
                break; // Success, exit loop
            } catch (Exception e) {
                attempt++;
                if (attempt == maxRetries) {
                    throw e; // Rethrow after 3 failed attempts
                }
                Thread.sleep(1000);
                // Optionally, add a short delay before retrying}
        }
    }

}

    public Boolean checkCollectionExistence(String collectionName) throws ExecutionException, InterruptedException {
         ListenableFuture<Boolean> future = qdrantClient.collectionExistsAsync(collectionName);
         return future.get();

    }


    public Status storeEmbedding (List<List<Float>> embeddings , UUID id , String collectionName , Payload payload) {

        if (embeddings == null) {
            return Status.NO_EMBEDDING;
        }

        ListenableFuture<Long> future = qdrantClient.countAsync(
                collectionName,
                Points.Filter.newBuilder()
                        .addMust(hasId(id(id)))
                        .build(),
                false,
                Duration.ofSeconds(30)
        );

        long count =1;
        try {
            count = future.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Failed to get Count of Point with id");
        }

        if (count>0)
        {
            return Status.POINT_WITH_ID_EXISTS;
        }

        Points.NamedVectors.Builder namedVectorsBuilder = Points.NamedVectors.newBuilder();
        for (int i = 0; i < embeddings.size(); i++) {
            namedVectorsBuilder.putVectors(
                    "img_" + (i + 1),
                    Points.Vector.newBuilder().addAllData(embeddings.get(i)).build()
            );
        }
        Points.NamedVectors namedVectors = namedVectorsBuilder.build();

        Points.Vectors vectors = Points.Vectors.newBuilder()
                .setVectors(namedVectors)
                .build();


        ListenableFuture<Points.UpdateResult> future1 = qdrantClient.upsertAsync(
                collectionName,
                List.of(
                Points.PointStruct.newBuilder()
                        .setId(id(id))
                        .setVectors(vectors)
                        .putAllPayload(payload.asMap())
                        .build()
                )

        );

        try {
            future1.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error while storing embedding");
        }


        return Status.OK;


    }

    public Points.NamedVectorsOutput getVectorsById(String collectionName, UUID id) throws ExecutionException, InterruptedException {

        ListenableFuture<List<Points.RetrievedPoint>> future = qdrantClient.retrieveAsync(
                collectionName,
                id(id),
                false,
                true,
                null
        );
        List<Points.RetrievedPoint> retrievedPoints = future.get();
        return retrievedPoints.getFirst().getVectors().getVectors();

    }

    public List<UUID> getSimillarPostIds(
            UUID id,
            String collectionName,
            int topK
    ) throws ExecutionException, InterruptedException {
        Points.NamedVectorsOutput vectorOutput = getVectorsById(collectionName, id);

        Set<UUID> result = new HashSet<>();
        for (Map.Entry<String, Points.VectorOutput> entry : vectorOutput.getVectorsMap().entrySet()) {
            String vectorName = entry.getKey();
            Points.VectorOutput queryVector = entry.getValue();

            Points.SearchPoints searchRequest = Points.SearchPoints.newBuilder()
                    .setCollectionName(collectionName)
                    .addAllVector(queryVector.getDataList())
                    .setLimit(topK)
                    .build();

            ListenableFuture<List<Points.ScoredPoint>> future = qdrantClient.searchAsync(searchRequest);
            List<Points.ScoredPoint> response = future.get();

            for (Points.ScoredPoint scoredPoint : response) {
                if (scoredPoint.getId().hasUuid()) {
                    UUID foundId = UUID.fromString(scoredPoint.getId().getUuid());
                    if (!foundId.equals(id)) { // Exclude the query id itself
                        result.add(foundId);
                    }
                }
            }
        }
        return new ArrayList<>(result);
    }

}

