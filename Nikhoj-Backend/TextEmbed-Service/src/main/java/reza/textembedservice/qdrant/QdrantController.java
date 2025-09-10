package reza.textembedservice.qdrant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reza.textembedservice.qdrant.enums.CollectionCreated;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/qdrant")
public class QdrantController {

    QdrantService qdrantService;
    public QdrantController(QdrantService qdrantService) {
        this.qdrantService = qdrantService;
    }

    @PostMapping("/create-collection")
    public ResponseEntity<CollectionCreated> createCollection
            (
                    @RequestBody CreateCollectionRequest createCollectionRequest) throws ExecutionException, InterruptedException {

        CollectionCreated st = qdrantService.createCollection(createCollectionRequest.name(), (int) createCollectionRequest.vector_size());

        return ResponseEntity.ok().body(st);
    }
}
