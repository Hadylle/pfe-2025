package com.example.OllamaAiMicroservice.Repositories;

import com.example.OllamaAiMicroservice.entity.FeatureUsage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureUsageRepository extends JpaRepository<FeatureUsage, Long> {
}
