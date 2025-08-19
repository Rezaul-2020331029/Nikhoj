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
@Table(name = "posts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "post_id")
    private UUID postId;

    @Column(name = "poster_id",nullable = false,updatable = false)
    private UUID posterId;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private PostType postType;

    @Column(name = "post_title", nullable = false,length = 1024)
    private String postTiltle;

    @Column(name = "description", nullable = false,length = 8000)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id")
    private Threads threads;


    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Report> reports;

    @Column(name = "img_urls")
    @OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ImageUrl> imageUrls;

    @OneToMany(mappedBy ="post" , fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PostSpec> postSpecs;




    private String district;
    private String city;
    @Column(name = "sub_district")
    private String subDistrict;
    @Column(name = "post_office")
    private String postOffice;
    @Column(name = "road_address")
    private  String roadAddress;


    private String address;

    @CreationTimestamp
    private LocalDateTime created;
    @UpdateTimestamp
    private LocalDateTime updated;

    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.ONGOING;

    @PrePersist
    @PreUpdate
    private void setAddress(){
        this.address = String.join(", ", this.roadAddress, this.postOffice, this.subDistrict,this.city,this.district);
    }





}
