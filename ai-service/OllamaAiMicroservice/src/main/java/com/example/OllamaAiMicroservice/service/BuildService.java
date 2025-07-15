package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.dto.BuildRequestDto;
import com.example.OllamaAiMicroservice.entity.CvEntity;

public interface BuildService {
    CvEntity save(BuildRequestDto dto, String userSub);
}
