package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.Repositories.FeatureUsageRepository;
import com.example.OllamaAiMicroservice.entity.FeatureUsage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeatureUsageService {

    private final FeatureUsageRepository usageRepository;

    // Existing method for feature logging
    public void log(String featureName, String userSub) {
        FeatureUsage usage = new FeatureUsage(null, featureName, userSub, LocalDateTime.now());
        usageRepository.save(usage);
    }

    // New method for rating submission
    public void logRating(String featureName, String userSub, int rating, String pageUrl) {
        FeatureUsage usage = new FeatureUsage();
        usage.setFeatureName(featureName);
        usage.setUserSub(userSub);
        usage.setTimestamp(LocalDateTime.now());
        usage.setRatingValue(rating);
        usage.setPageContext(pageUrl);
        usageRepository.save(usage);
    }

    // Get all ratings for a specific feature
    public List<FeatureUsage> getRatingsForFeature(String featureName) {
        return usageRepository.findByFeatureNameAndRatingValueIsNotNull(featureName);
    }

    // Existing method
    public List<FeatureUsage> findAll() {
        return usageRepository.findAll();
    }
}