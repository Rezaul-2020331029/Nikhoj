package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetPostsByFilterReq {

    String type;
    Date date;
    String category;
    Long threadId;
    String district;

    int page;
    int limit;


}
