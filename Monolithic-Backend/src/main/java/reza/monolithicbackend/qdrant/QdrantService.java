package reza.monolithicbackend.qdrant;


import com.google.common.util.concurrent.ListenableFuture;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.grpc.Collections;
import io.qdrant.client.grpc.Points;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import reza.monolithicbackend.qdrant.enums.CollectionCreated;
import reza.monolithicbackend.qdrant.enums.UploadPointStatus;


import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static io.qdrant.client.PointIdFactory.id;
import static io.qdrant.client.QueryFactory.nearest;
import static io.qdrant.client.VectorFactory.multiVector;
import static io.qdrant.client.VectorsFactory.vectors;

@Slf4j
@Component
public class QdrantService {

    private final QdrantClient qdrantClient;
    public QdrantService(QdrantClient qdrantClient) {
        this.qdrantClient = qdrantClient;
    }

    public CollectionCreated createCollection(String collectionName, int size) throws ExecutionException, InterruptedException {



        try {
            if (checkCollectionExistence(collectionName))
                return CollectionCreated.COLLECTION_EXISTS;

            qdrantClient
                    .createCollectionAsync(collectionName,
                            Collections.VectorParams.newBuilder().setSize(size)
                                    .setDistance(Collections.Distance.Cosine)
                                    .setMultivectorConfig(Collections.MultiVectorConfig.newBuilder()
                                            .setComparator(Collections.MultiVectorComparator.MaxSim)
                                            .build())
                                    .build()).get();

            return CollectionCreated.COLLECTION_CREATED;


        } catch (Exception e) {

            return CollectionCreated.ERROR;

        }


    }

    public Boolean checkCollectionExistence(String collectionName) throws ExecutionException, InterruptedException {
        ListenableFuture<Boolean> future = qdrantClient.collectionExistsAsync(collectionName);
        return future.get();

    }

    public UploadPointStatus uploadPoint(
            String collectionName,
            String id,
            List<List<Float>> vectors
    ) {
        try {
            // Validate inputs
            if (collectionName == null || id == null || vectors == null || vectors.isEmpty()) {
                log.error("Invalid input parameters for uploadPoint");
                return UploadPointStatus.ERROR;
            }

            // Parse UUID with better error handling
            UUID pointId;
            try {
                pointId = UUID.fromString(id);
            } catch (IllegalArgumentException e) {
                log.error("Invalid UUID format: {}", id);
                return UploadPointStatus.ERROR;
            }

            // Log vector information
            log.info("Number of vectors: {}", vectors.size());
            if (!vectors.isEmpty()) {
                log.info("Size of first vector: {}", vectors.get(0).size());
            }

            // Convert List<List<Float>> to float[][] exactly as shown in template
            float[][] vectorArray = new float[vectors.size()][];
            for (int i = 0; i < vectors.size(); i++) {
                List<Float> vector = vectors.get(i);
                vectorArray[i] = new float[vector.size()];
                log.info("Vector {} size: {}", i, vector.size());
                for (int j = 0; j < vector.size(); j++) {
                    vectorArray[i][j] = vector.get(j);
                }
            }

            qdrantClient
                    .upsertAsync(
                            collectionName,
                            List.of(
                                    Points.PointStruct.newBuilder()
                                            .setId(id(pointId))
                                            .setVectors(vectors(multiVector(vectorArray)))
                                            .build()
                            ))
                    .get();

            log.info("Successfully uploaded point {} to collection {}", id, collectionName);
            return UploadPointStatus.UPLOADED;

        } catch (Exception e) {
            log.error("Error uploading point {} to collection {}: {}", id, collectionName, e.getMessage(), e);
            return UploadPointStatus.ERROR;
        }
    }




    public List<String>  search(
            String collectionName,
            String id,
            long limit
    )
    {

        try {

            ListenableFuture<List<Points.ScoredPoint>> future = qdrantClient
                            .queryAsync(Points.QueryPoints.newBuilder()
                            .setCollectionName(collectionName)
                            .setQuery(nearest(UUID.fromString(id)))
                            .setLimit(5)
                            .build()
                    );

            List<Points.ScoredPoint> points = future.get();

            List<String> ids = new java.util.ArrayList<>(List.of());
            assert points != null;
            for (Points.ScoredPoint point : points) {
                ids.add(point.getId().toString());
            }

            return ids;

        } catch (Exception e) {

            return List.of();

        }






    }
}
