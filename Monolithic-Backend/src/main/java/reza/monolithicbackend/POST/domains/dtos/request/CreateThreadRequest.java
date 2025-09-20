package reza.monolithicbackend.POST.domains.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateThreadRequest {

    private String title;
    private String description;
    private String location;

}
