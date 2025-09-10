package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.A;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetPostsByPostTypeReq {

    private String postType;
    private int page;
    private int limit;


}
