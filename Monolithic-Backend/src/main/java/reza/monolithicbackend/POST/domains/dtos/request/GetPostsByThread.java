package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetPostsByThread {
    Long threadId;
    String threadName;
    int page;
    int limit;
}
