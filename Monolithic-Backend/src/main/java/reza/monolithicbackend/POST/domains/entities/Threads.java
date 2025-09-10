package reza.monolithicbackend.POST.domains.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name = "threads") // Add this annotation
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"posts"})
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

    @JsonProperty("postIds")
    @Transient
    public List<UUID> getPostIds() {
        if (posts == null || posts.isEmpty()) {
            return List.of();
        }
        return posts.stream()
                .map(Post::getPostId)
                .collect(Collectors.toList());
    }

    @CreationTimestamp
    private LocalDateTime created;

    @UpdateTimestamp
    private LocalDateTime updated;

    private UUID creatorId;
}