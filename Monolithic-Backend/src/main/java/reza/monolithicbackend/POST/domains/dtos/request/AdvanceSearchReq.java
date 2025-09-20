package reza.monolithicbackend.POST.domains.dtos.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import reza.monolithicbackend.POST.domains.entities.PostSpec;
import reza.monolithicbackend.POST.domains.entities.PostType;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdvanceSearchReq {

    private String category;
    private String postType;
    private Map<String ,String> postSpec;
    private int page;
    private int size;

}
