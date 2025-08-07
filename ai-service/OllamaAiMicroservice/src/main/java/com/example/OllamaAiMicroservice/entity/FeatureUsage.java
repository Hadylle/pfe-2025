package com.example.OllamaAiMicroservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeatureUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String featureName;

    private String userSub;
    private LocalDateTime timestamp;


    private LocalDateTime usedAt;
    // New fields for ratings
    private Integer ratingValue;
    private String pageContext;
    // Constructor for regular feature logging (backwards compatible)
    public FeatureUsage(Long id, String featureName, String userSub, LocalDateTime timestamp) {
        this.id = id;
        this.featureName = featureName;
        this.userSub = userSub;
        this.timestamp = timestamp;
    }
}
