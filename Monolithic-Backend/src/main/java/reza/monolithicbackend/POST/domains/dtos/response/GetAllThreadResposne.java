package reza.monolithicbackend.POST.domains.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GetAllThreadResposne {
    private Long threadId;
    private String title;
    private String description;
    private String location;
    private LocalDateTime created;
}
