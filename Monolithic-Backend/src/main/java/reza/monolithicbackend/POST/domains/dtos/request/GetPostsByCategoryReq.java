package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetPostsByCategoryReq {
    String category;
    int page;
    int limit;


}
