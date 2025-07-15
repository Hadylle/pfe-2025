package com.example.OllamaAiMicroservice.controller;

import com.example.OllamaAiMicroservice.service.CvPdfGeneratorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.Map;
import java.util.UUID;

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

        try {
            Map<String, Object> cvData = objectMapper.readValue(cvDataJson, Map.class);

            // Save photo if provided
            File tempPhoto = null;
            if (photoFile != null && !photoFile.isEmpty()) {
                String filename = UUID.randomUUID() + "-" + StringUtils.cleanPath(photoFile.getOriginalFilename());
                tempPhoto = File.createTempFile("cvphoto-", filename);
                photoFile.transferTo(tempPhoto);
                cvData.put("photo", tempPhoto.toURI().toString()); // Use URI for Flying Saucer
            }

            byte[] pdf = pdfGeneratorService.generatePdf(cvData);

            if (tempPhoto != null && tempPhoto.exists()) {
                tempPhoto.delete(); // Clean up
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"cv.pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(("Error generating PDF: " + e.getMessage()).getBytes());
        }
    }
}
