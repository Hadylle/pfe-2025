package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.dto.CvAnalysisResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CvTailoredImprovementService {

    private final OllamaChatModel chatModel;
    private final ObjectMapper objectMapper;

    public CvAnalysisResult tailorCvToJob(String cvText, String jobDescription) {
        String prompt = """
You are a professional CV tailoring assistant with expertise in cybersecurity and HR.

You will be given:
1. A user's CV in raw text (between the first ---)
2. A job description (between the second ---)

---
CV:
%s
---
JOB DESCRIPTION:
%s
---

Your task is to improve and tailor the CV **for the specific job**, following these rules:

✅ OBJECTIVE: Increase match with the job description (50%%+), by realistically integrating more **job-relevant skills, keywords, and technologies** from the job description into the CV.

🔍 INSTRUCTIONS:
1. Rewrite the CV in the exact JSON format provided below.
2. DO NOT invent fake experience or job history.
3. You may **adjust wording and expand existing achievements**, projects, or skills to reflect **relevant tools and security practices** (e.g., “applied vulnerability scanning”, “followed NIST guidelines”, etc.)
4. Add certifications *only* if **commonly self-learned or entry-level** (e.g., CEH, OSCP if plausible).
5. Emphasize transferable skills like problem-solving, attention to detail, cloud awareness, scripting, or knowledge of protocols, even if not explicitly in the original CV.
6. Rewrite `aboutMe`, `experience`, `projects`, and `skills` adding to the already existing text information to sound like the applicant aligns with the role.
7. Use a **professional, concise tone**. Stay within 1024 tokens.

Return ONLY a clean and valid JSON object with this schema:

{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+123456789",
  "address": "123 Main St, City",
  "portfolio": "https://portfolio.com",
  "linkedin": "https://linkedin.com/in/username",
  "github": "https://github.com/username",
  "aboutMe": "Tailored summary highlighting cybersecurity relevance",
  "skills": ["Skill1", "Skill2", "..."],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Jan 2020 - Dec 2022",
      "achievements": ["Achievement 1", "Achievement 2"],
      "techStack": ["Tool1", "Tool2"]
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
      "description": "Updated description to reflect job-related work",
      "techStack": ["Tech1", "Tech2"],
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
""".formatted(cvText, jobDescription);

        OllamaOptions options = new OllamaOptions();
        options.setModel("llama3");
        options.setTemperature(0.7); // balanced creativity
        options.setNumPredict(1536); // allow longer tailoring

        ChatResponse response = chatModel.call(new Prompt(prompt, options));

        try {
            String raw = response.getResult().getOutput().getText();
            String json = extractJson(raw);
            return objectMapper.readValue(json, CvAnalysisResult.class);
        } catch (Exception e) {
            throw new RuntimeException("❌ Failed to parse tailored CV JSON: " + e.getMessage(), e);
        }
    }

    private String extractJson(String input) {
        int start = input.indexOf('{');
        int end = input.lastIndexOf('}');
        if (start != -1 && end != -1 && end > start) {
            return input.substring(start, end + 1);
        }
        throw new RuntimeException("No JSON object found in AI response");
    }
}
