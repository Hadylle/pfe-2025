package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.dto.BuildRequestDto;
import com.example.OllamaAiMicroservice.dto.CvAnalysisResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CvImprovementService {

    private final OllamaChatModel chatModel;
    private final ObjectMapper objectMapper;

    public CvAnalysisResult improveCv(String cvText) {
        String prompt = """
        You are an expert CV improvement AI assistant.

        You will receive a resume in **raw text format** (between ---), and your task is to:
        - Extract its data into a structured JSON format.
        - Improve all descriptions: write them clearly and professionally.
        - Fix spelling and grammar issues.
        - Remove vague or weak expressions.
        - Enhance content where information is lacking (e.g., job duties, project outcomes), without inventing unrealistic claims.
        - Maintain the exact JSON structure described below.
        - DO NOT add any extra text before or after the JSON. Output only valid JSON.

        ---
        %s
        ---

        Return the improved result with this structure:

        {
          "name": "Full Name",
          "email": "email@example.com",
          "phone": "+123456789",
          "address": "123 Main St, City",
          "portfolio": "https://portfolio.com",
          "linkedin": "https://linkedin.com/in/username",
          "github": "https://github.com/username",
          "aboutMe": "Improved summary...",
          "skills": ["Skill1", "Skill2"],
          "experience": [
            {
              "company": "Company Name",
              "role": "Job Title",
              "duration": "Jan 2020 - Dec 2022",
              "achievements": ["Improved achievement A", "Improved achievement B"],
              "techStack": ["Java", "React"]
            }
          ],
          "education": [
            {
              "institution": "University Name",
              "degree": "BSc",
              "field": "Computer Science",
              "startDate": "Sep 2019",
              "endDate": "June 2023"
            }
          ],
          "projects": [
            {
              "title": "Project Name",
              "description": "Improved project description",
              "techStack": ["React", "Spring Boot"],
              "link": "https://github.com/project"
            }
          ],
          "certifications": [
            {
              "title": "Certification Name",
              "issuer": "Organization",
              "year": "2023"
            }
          ],
          "languages": ["English", "French"],
          "interests": ["Reading", "Hiking"],
          "socialClubs": ["Robotics Club"]
        }
        """.formatted(cvText);

        OllamaOptions options = new OllamaOptions();
        options.setModel("llama3");
        options.setTemperature(0.85);

        ChatResponse response = chatModel.call(new Prompt(prompt, options));
        try {
            String content = response.getResult().getOutput().getText();
            String json = extractJson(content);
            System.out.println("🔍 Improved JSON from AI:\n" + json);

            CvAnalysisResult result = objectMapper.readValue(json, CvAnalysisResult.class);
            normalizeResult(result);
            return result;

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse improved CV JSON: " + e.getMessage(), e);
        }
    }

    private BuildRequestDto mapToBuildRequestDto(CvAnalysisResult result) {
        BuildRequestDto dto = new BuildRequestDto();

        // Basic fields
        dto.setName(result.getName());
        dto.setEmail(result.getEmail());
        dto.setPhone(result.getPhone());
        dto.setAddress(result.getAddress());
        dto.setPortfolio(result.getPortfolio());
        dto.setLinkedin(result.getLinkedin());
        dto.setGithub(result.getGithub());
        dto.setAboutMe(result.getAboutMe());

        // Skills: List<String> -> List<SkillDto>
        if (result.getSkills() != null) {
            dto.setSkills(result.getSkills().stream()
                    .map(skillStr -> {
                        BuildRequestDto.SkillDto skillDto = new BuildRequestDto.SkillDto();
                        skillDto.setValue(skillStr);
                        return skillDto;
                    })
                    .collect(Collectors.toList()));
        }

        // Languages, Interests, SocialClubs are List<String> in both classes: set directly
        dto.setLanguages(result.getLanguages() != null ? result.getLanguages() : List.of());
        dto.setInterests(result.getInterests() != null ? result.getInterests() : List.of());
        dto.setSocialClubs(result.getSocialClubs() != null ? result.getSocialClubs() : List.of());

        // Map Education List
        if (result.getEducation() != null) {
            dto.setEducation(result.getEducation().stream()
                    .map(edu -> {
                        BuildRequestDto.EducationDto eduDto = new BuildRequestDto.EducationDto();
                        eduDto.setInstitution(edu.getInstitution());
                        eduDto.setDegree(edu.getDegree());
                        eduDto.setField(edu.getField());
                        eduDto.setStartDate(edu.getStartDate());
                        eduDto.setEndDate(edu.getEndDate());
                        return eduDto;
                    }).collect(Collectors.toList()));
        }

        // Map Experience List
        if (result.getExperience() != null) {
            dto.setExperience(result.getExperience().stream()
                    .map(exp -> {
                        BuildRequestDto.ExperienceDto expDto = new BuildRequestDto.ExperienceDto();
                        expDto.setCompany(exp.getCompany());
                        expDto.setRole(exp.getRole());
                        expDto.setDuration(exp.getDuration());
                        expDto.setAchievements(exp.getAchievements() != null ? exp.getAchievements() : List.of());
                        expDto.setTechStack(exp.getTechStack() != null ? exp.getTechStack() : List.of());
                        return expDto;
                    }).collect(Collectors.toList()));
        }

        // Map Projects List
        if (result.getProjects() != null) {
            dto.setProjects(result.getProjects().stream()
                    .map(proj -> {
                        BuildRequestDto.ProjectDto projDto = new BuildRequestDto.ProjectDto();
                        projDto.setTitle(proj.getTitle());
                        projDto.setDescription(proj.getDescription());
                        projDto.setLink(proj.getLink());
                        projDto.setTechStack(proj.getTechStack() != null ? proj.getTechStack() : List.of());
                        return projDto;
                    }).collect(Collectors.toList()));
        }

        // Map Certifications List
        if (result.getCertifications() != null) {
            dto.setCertifications(result.getCertifications().stream()
                    .map(cert -> {
                        BuildRequestDto.CertificationDto certDto = new BuildRequestDto.CertificationDto();
                        certDto.setTitle(cert.getTitle());
                        certDto.setIssuer(cert.getIssuer());
                        certDto.setYear(cert.getYear());
                        return certDto;
                    }).collect(Collectors.toList()));
        }

        return dto;
    }


    private String extractJson(String input) {
        int start = input.indexOf('{');
        int end = input.lastIndexOf('}');

        if (start != -1 && end != -1 && end > start) {
            return input.substring(start, end + 1);
        } else {
            throw new RuntimeException("No JSON object found in AI response");
        }
    }

    private void normalizeResult(CvAnalysisResult result) {
        if (result == null) return;

        if (result.getName() == null) result.setName("");
        if (result.getEmail() == null) result.setEmail("");
        if (result.getPhone() == null) result.setPhone("");
        if (result.getAddress() == null) result.setAddress("");
        if (result.getPortfolio() == null) result.setPortfolio("");
        if (result.getLinkedin() == null) result.setLinkedin("");
        if (result.getGithub() == null) result.setGithub("");
        if (result.getAboutMe() == null) result.setAboutMe("");

        if (result.getSkills() == null) result.setSkills(new ArrayList<>());
        if (result.getExperience() == null) result.setExperience(new ArrayList<>());
        if (result.getEducation() == null) result.setEducation(new ArrayList<>());
        if (result.getProjects() == null) result.setProjects(new ArrayList<>());
        if (result.getCertifications() == null) result.setCertifications(new ArrayList<>());
        if (result.getLanguages() == null) result.setLanguages(new ArrayList<>());
        if (result.getInterests() == null) result.setInterests(new ArrayList<>());
        if (result.getSocialClubs() == null) result.setSocialClubs(new ArrayList<>());

        for (CvAnalysisResult.Experience exp : result.getExperience()) {
            if (exp.getCompany() == null) exp.setCompany("");
            if (exp.getRole() == null) exp.setRole("");
            if (exp.getDuration() == null) exp.setDuration("");
            if (exp.getAchievements() == null) exp.setAchievements(new ArrayList<>());
            if (exp.getTechStack() == null) exp.setTechStack(new ArrayList<>());
        }

        for (CvAnalysisResult.Education edu : result.getEducation()) {
            if (edu.getInstitution() == null) edu.setInstitution("");
            if (edu.getDegree() == null) edu.setDegree("");
            if (edu.getField() == null) edu.setField("");
            if (edu.getStartDate() == null) edu.setStartDate("");
            if (edu.getEndDate() == null) edu.setEndDate("");
        }

        for (CvAnalysisResult.Project proj : result.getProjects()) {
            if (proj.getTitle() == null) proj.setTitle("");
            if (proj.getDescription() == null) proj.setDescription("");
            if (proj.getTechStack() == null) proj.setTechStack(new ArrayList<>());
            if (proj.getLink() == null) proj.setLink("");
        }

        for (CvAnalysisResult.Certification cert : result.getCertifications()) {
            if (cert.getTitle() == null) cert.setTitle("");
            if (cert.getIssuer() == null) cert.setIssuer("");
            if (cert.getYear() == null) cert.setYear("");
        }
    }
}
