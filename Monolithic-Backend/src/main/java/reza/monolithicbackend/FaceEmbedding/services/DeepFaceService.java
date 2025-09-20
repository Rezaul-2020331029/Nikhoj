package reza.monolithicbackend.FaceEmbedding.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import reza.monolithicbackend.qdrant.QdrantService;

import java.util.List;
import java.util.UUID;

@Service

public class DeepFaceService {

    private DeepFaceClient deepFaceClient;
    private QdrantService qdrantService;

    @Autowired
    public DeepFaceService (DeepFaceClient deepFaceClient, QdrantService qdrantService) {
        this.deepFaceClient = deepFaceClient;
        this.qdrantService = qdrantService;
    }


    @Async
    public void recieveFaceFiles (UUID postId, List<String> files) {



        List<List<Float>> embeddings =  deepFaceClient.getEmbeddings(files,"Facenet512");
        System.out.println("Embeddings size: " + embeddings.size());
        if (!embeddings.isEmpty()) {
            System.out.println("Vector size: " + embeddings.get(0).size());
        }
        try{
            qdrantService.uploadPoint("Facenet512",postId.toString(),embeddings);


        }
        catch (Exception e){

            System.out.println("Error uploading point");
            throw new RuntimeException("Error uploading point");

        }








    }
}
