package com.example.OllamaAiMicroservice.controller;

import com.example.OllamaAiMicroservice.service.CvPdfGeneratorService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CvPdfController {

    private final CvPdfGeneratorService pdfGeneratorService;
    private final ObjectMapper objectMapper;

    @PostMapping(value = "/generate-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> generateCvPdfMultipart(
            @RequestPart("cvData") String cvDataJson,
            @RequestPart(value = "photo", required = false) MultipartFile photoFile) {

        File tempPhoto = null;
        try {
            // Convert JSON string to Map
            Map<String, Object> cvData = objectMapper.readValue(cvDataJson, new TypeReference<>() {});

            // ✅ Normalize skills: ensure it's a List<String>
            Object rawSkills = cvData.get("skills");
            if (rawSkills instanceof List<?> skillList) {
                List<String> normalizedSkills = skillList.stream()
                        .map(skill -> {
                            if (skill instanceof Map<?, ?> skillMap && skillMap.containsKey("value")) {
                                return String.valueOf(skillMap.get("value"));
                            } else {
                                return String.valueOf(skill);
                            }
                        })
                        .collect(Collectors.toList());
                cvData.put("skills", normalizedSkills);
            }

            // 📸 Handle optional photo
            if (photoFile != null && !photoFile.isEmpty()) {
                String filename = UUID.randomUUID() + "-" + StringUtils.cleanPath(photoFile.getOriginalFilename());
                tempPhoto = File.createTempFile("cvphoto-", filename);
                photoFile.transferTo(tempPhoto);
                cvData.put("photo", tempPhoto.toURI().toString());
            }

            // 📄 Generate PDF
            byte[] pdf = pdfGeneratorService.generatePdf(cvData);

            // 🧹 Clean up temp file
            if (tempPhoto != null && tempPhoto.exists()) tempPhoto.delete();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"cv.pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        } catch (Exception e) {
            if (tempPhoto != null && tempPhoto.exists()) tempPhoto.delete();
            return ResponseEntity.badRequest()
                    .body(("Error generating PDF: " + e.getMessage()).getBytes());
        }
    }
}
