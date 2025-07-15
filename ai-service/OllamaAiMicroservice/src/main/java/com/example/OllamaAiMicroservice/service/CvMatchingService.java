// File: CvMatchingService.java
package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.dto.CvMatchResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CvMatchingService {

    private final OllamaChatModel chatModel;
    private final ObjectMapper objectMapper;

    public CvMatchResult matchCvToJob(String cvText, String jobText) {
        Set<String> cvSkills = extractSkills(cvText);
        Set<String> jobSkills = extractSkills(jobText);

        Set<String> common = new HashSet<>(cvSkills);
        common.retainAll(jobSkills);

        Set<String> missing = new HashSet<>(jobSkills);
        missing.removeAll(cvSkills);

        double similarity = jobSkills.isEmpty() ? 0.0 : ((double) common.size() / jobSkills.size()) * 100;
        String explanation;

        if (jobSkills.isEmpty()) {
            explanation = "No identifiable skills in the job description. Score is 0 by default.";
        } else if (common.isEmpty()) {
            explanation = "No overlapping skills were found between CV and job description.";
        } else {
            explanation = String.format("%d out of %d required skills matched (%.2f%%).", common.size(), jobSkills.size(), similarity);
        }

        CvMatchResult result = new CvMatchResult();
        result.setSimilarity(similarity);
        result.setScoreExplanation(explanation);
        result.setMissingSkills(String.join(", ", missing));
        result.setCommonSkills(String.join(", ", common));
        result.setJobFit(similarity >= 60 ? "yes" : "no");

        return result;
    }

    private Set<String> extractSkills(String text) {
        String prompt = """
        You are a CV/job description parser.

        Extract all technical and soft skills, tools, certifications, and technologies from the text below.
        Respond ONLY with a JSON array of strings (no explanation).

        Example:
        ["Java", "Python", "Teamwork", "AWS", "Git", "Communication"]

        ---
        %s
        ---
        """.formatted(text);

        OllamaOptions options = new OllamaOptions();
        options.setModel("llama3");
        options.setTemperature(0.3);

        ChatResponse response = chatModel.call(new Prompt(prompt, options));

        try {
            String content = response.getResult().getOutput().getText();
            JsonNode arrayNode = objectMapper.readTree(content);

            Set<String> skills = new HashSet<>();
            if (arrayNode.isArray()) {
                for (JsonNode node : arrayNode) {
                    skills.add(node.asText().toLowerCase().trim());
                }
            }
            return skills;
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract skills from text", e);
        }
    }
}
