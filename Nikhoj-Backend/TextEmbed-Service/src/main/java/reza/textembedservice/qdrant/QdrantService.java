package reza.textembedservice.qdrant;


import com.google.common.util.concurrent.ListenableFuture;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.grpc.Collections;
import io.qdrant.client.grpc.Points;
import org.springframework.stereotype.Service;
import reza.textembedservice.qdrant.enums.CollectionCreated;
import reza.textembedservice.qdrant.enums.SearchStatus;
import reza.textembedservice.qdrant.enums.UploadPointStatus;


import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static io.qdrant.client.PointIdFactory.id;
import static io.qdrant.client.QueryFactory.nearest;
import static io.qdrant.client.VectorFactory.multiVector;
import static io.qdrant.client.VectorsFactory.vectors;

@Service
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
    )

    {

        try {

            qdrantClient
                    .upsertAsync(
                            collectionName,
                            List.of(
                                    Points.PointStruct.newBuilder()
                                            .setId(id(UUID.fromString(id)))
                                            .setVectors(vectors(multiVector(vectors)))
                                            .build()
                            ))
                    .get();

            return UploadPointStatus.UPLOADED;


        } catch (Exception e) {
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
                            .setLimit(limit)
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
