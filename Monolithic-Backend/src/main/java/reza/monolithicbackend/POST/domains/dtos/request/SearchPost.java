package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchPost {

    private  String type;
    private  String search;
    private int page;
    private int limit;

}
