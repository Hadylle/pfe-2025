package com.example.OllamaAiMicroservice.Repositories;

import com.example.OllamaAiMicroservice.entity.FeatureUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureUsageRepository extends JpaRepository<FeatureUsage, Long> {
    List<FeatureUsage> findByFeatureNameAndRatingValueIsNotNull(String featureName);

}
