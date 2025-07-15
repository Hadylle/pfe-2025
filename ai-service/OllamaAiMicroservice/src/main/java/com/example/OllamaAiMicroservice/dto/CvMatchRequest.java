package com.example.OllamaAiMicroservice.dto;

import lombok.Data;

@Data
public class CvMatchRequest {
    private String cv_text;
    private String job_description;
}
