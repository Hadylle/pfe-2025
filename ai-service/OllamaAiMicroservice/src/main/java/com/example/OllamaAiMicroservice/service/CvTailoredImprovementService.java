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
You are an expert CV tailoring assistant with advanced knowledge in cybersecurity and HR practices.

You will receive:
1️⃣ The raw CV of a candidate (between the first ---)
2️⃣ A cybersecurity job description (between the second ---)

---
CV:
%s
---
JOB DESCRIPTION:
%s
---

🎯 **YOUR OBJECTIVE**:
Rewrite the CV to maximize alignment with the job description, realistically integrating **job-relevant cybersecurity tools, protocols, skills, and keywords**, even if they were not explicitly mentioned in the original CV.

🔧 **TAILORING INSTRUCTIONS**:
- Return ONLY a valid **JSON object** (schema is below).
- ✏️ Enrich the CV with **phrasing and achievements** relevant to cybersecurity roles.
- ✏️ Use **terminology** from the job description like `SIEM`, `SOC`, `NIST`, `risk assessment`, `incident response`, `OWASP`, `encryption`, `network defense`, etc.
- ✅ Keep experience real but **expand responsibilities** where plausible (e.g., "Improved system security using NIST guidelines", "Automated vulnerability scans with Python").
- ✅ Add relevant certifications (e.g., CompTIA Security+, CEH, OSCP) **if plausible**.
- ✅ Modify `aboutMe`, `experience`, `projects`, and `skills` to reflect alignment with **cybersecurity** and **defensive security operations**.
- ✅ Add realistic achievements or project improvements (e.g., "Implemented firewall rules", "Wrote bash scripts for log parsing").
- ⚠️ Do NOT invent new employers or employment history.
- 🔒 Focus on **skills**, **methods**, **mindsets**, and **tools** mentioned in the job post.
- ✨ Keep the language **concise, technical, and HR-friendly**.

📦 **REQUIRED OUTPUT FORMAT (JSON)**:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+123456789",
  "address": "123 Main St, City",
  "portfolio": "https://portfolio.com",
  "linkedin": "https://linkedin.com/in/username",
  "github": "https://github.com/username",
  "aboutMe": "Updated summary emphasizing cybersecurity capabilities and goals",
  "skills": ["SIEM", "Python", "Incident Response", "Risk Analysis", "NIST"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Jan 2021 - Present",
      "achievements": ["Implemented log monitoring using ELK", "Wrote scripts to automate alert triage"],
      "techStack": ["Splunk", "Python", "Firewalls", "Linux"]
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
      "title": "Secure File Transfer System",
      "description": "Developed a secure file-sharing system with encryption and user authentication",
      "techStack": ["Python", "OpenSSL", "JWT"],
      "link": "https://github.com/secure-transfer"
    }
  ],
  "certifications": [
    {
      "title": "CompTIA Security+",
      "issuer": "CompTIA",
      "year": "2023"
    }
  ],
  "languages": ["English", "French"],
  "interests": ["Capture The Flag", "Cyber News", "Penetration Testing"],
  "socialClubs": ["Cybersecurity Club"]
}
""".formatted(cvText, jobDescription);

        OllamaOptions options = new OllamaOptions();
        options.setModel("llama3");
        options.setTemperature(0.6); // balanced creativity
        options.setNumPredict(1536); // allow longer structured response

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
