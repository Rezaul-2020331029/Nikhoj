package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateCategoryReq {
    private String name;
    private String description;
    private List<String> specNames;

}
