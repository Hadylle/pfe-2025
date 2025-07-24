package com.example.OllamaAiMicroservice.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cv_entity")
public class CvEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔑 Add this to link CVs to users
    @Column(nullable = false, name = "user_sub")
    private String userSub;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String email;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(length = 255)
    private String phone;

    @Column(length = 255)
    private String address;

    @Column(length = 255)
    private String portfolio;

    @Column(length = 255)
    private String linkedin;

    @Column(length = 255)
    private String github;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Skill> skills;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Education> education;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Experience> experience;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Project> projects;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Certification> certifications;

    @ElementCollection
    private List<String> languages;

    @ElementCollection
    private List<String> interests;

    @ElementCollection
    private List<String> socialClubs;
}
