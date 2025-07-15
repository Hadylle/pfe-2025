package com.example.OllamaAiMicroservice.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CvMatchResult {
    private double similarity;
    private String scoreExplanation;
    private String missingSkills;
    private String commonSkills;
    private String jobFit;
}
