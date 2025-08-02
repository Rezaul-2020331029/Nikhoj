// ImageEmbedding-Service/src/main/java/reza/imageembeddingservice/services/QdrantService.java

package reza.imageembeddingservice.services;

import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class QdrantService {

    QdrantClient qdrantClient = new QdrantClient(
            QdrantGrpcClient.newBuilder(
                    "localhost",6334,false
            ).build()
    );


    public void  createFaceImgCollection()
    {

    }
}