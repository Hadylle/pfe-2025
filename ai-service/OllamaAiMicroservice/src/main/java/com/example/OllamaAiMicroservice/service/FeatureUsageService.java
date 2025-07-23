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

    public void log(String featureName, String userSub) {
        FeatureUsage usage = new FeatureUsage(null, featureName, userSub, LocalDateTime.now());
        usageRepository.save(usage);
    }

    public List<FeatureUsage> findAll() {
        return usageRepository.findAll(); // ← This calls the database and fetches all records
    }
}

