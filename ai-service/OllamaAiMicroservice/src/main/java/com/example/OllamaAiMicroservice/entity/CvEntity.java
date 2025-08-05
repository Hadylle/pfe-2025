package com.example.OllamaAiMicroservice.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
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

    @Column(nullable = false, name = "user_sub")
    private String userSub;

    private String name;
    private String email;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    private String phone;
    private String address;
    private String portfolio;
    private String linkedin;
    private String github;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Education> education = new ArrayList<>();

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Experience> experience = new ArrayList<>();

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Project> projects = new ArrayList<>();

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Certification> certifications = new ArrayList<>();

    @ElementCollection
    private List<String> languages = new ArrayList<>();

    @ElementCollection
    private List<String> interests = new ArrayList<>();

    @ElementCollection
    private List<String> socialClubs = new ArrayList<>();

    public void assignParentReferences() {
        if (skills != null) skills.forEach(skill -> skill.setCv(this));
        if (education != null) education.forEach(edu -> edu.setCv(this));
        if (experience != null) experience.forEach(exp -> exp.setCv(this));
        if (projects != null) projects.forEach(proj -> proj.setCv(this));
        if (certifications != null) certifications.forEach(cert -> cert.setCv(this));
    }
}
