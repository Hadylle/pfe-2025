package com.example.OllamaAiMicroservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class BuildRequestDto {

    private String name;
    private String email;
    private String phone;
    private String address;
    private String portfolio;
    private String linkedin;
    private String github;
    private String aboutMe;

    private List<String> languages;
    private List<String> interests;
    private List<String> socialClubs;

    private List<SkillDto> skills;
    private List<EducationDto> education;
    private List<ExperienceDto> experience;
    private List<ProjectDto> projects;
    private List<CertificationDto> certifications;

    @Data public static class SkillDto { private String value; }

    @Data public static class EducationDto {
        private String institution;
        private String degree;
        private String field;
        private String startDate;
        private String endDate;
    }

    @Data public static class ExperienceDto {
        private String company;
        private String role;
        private String duration;
        private List<String> achievements;
        private List<String> techStack;
    }

    @Data public static class ProjectDto {
        private String title;
        private String description;
        private String link;
        private List<String> techStack;
    }

    @Data public static class CertificationDto {
        private String title;
        private String issuer;
        private String year;
    }
}
