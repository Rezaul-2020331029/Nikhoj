package reza.postservice.domains.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Threads {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thread_id")
    private Long threadId;

    @Column(name = "title", nullable = false, length = 1024)
    private String title;

    @Column(name = "description", length = 8000)
    private String description;

    @OneToMany(mappedBy = "threads", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Post> posts;

    private String location;


    @CreationTimestamp
    private LocalDateTime created;

    @UpdateTimestamp
    private LocalDateTime updated;

    private UUID creatorId;



}
