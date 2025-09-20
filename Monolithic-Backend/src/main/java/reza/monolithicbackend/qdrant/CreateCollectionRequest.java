package reza.monolithicbackend.qdrant;

public record CreateCollectionRequest(
        String name,
        long vector_size
) {
}
