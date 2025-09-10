package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetSpecsReq {
    private String name;
}
