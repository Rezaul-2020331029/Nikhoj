package reza.textembedservice.qdrant;

public record CreateCollectionRequest(
        String name,
        long vector_size
) {
}
