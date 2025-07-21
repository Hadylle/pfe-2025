package com.example.OllamaAiMicroservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CvPdfGeneratorService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${pdf.service.url:http://localhost:3001}")
    private String pdfServiceUrl;

    public byte[] generatePdf(Map<String, Object> cvData) {
        return generatePdf(cvData, null);
    }

    public byte[] generatePdf(Map<String, Object> cvData, File photoFile) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

            // Add CV data as JSON
            body.add("cvData", objectMapper.writeValueAsString(cvData));

            // Add photo if provided
            if (photoFile != null && photoFile.exists()) {
                ByteArrayResource photoResource = new ByteArrayResource(Files.readAllBytes(photoFile.toPath())) {
                    @Override
                    public String getFilename() {
                        return photoFile.getName();
                    }
                };
                body.add("photo", photoResource);
            }

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    pdfServiceUrl + "/generate-pdf",
                    HttpMethod.POST,
                    requestEntity,
                    byte[].class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                throw new RuntimeException("PDF generation failed with status: " + response.getStatusCode());
            }

        } catch (IOException e) {
            log.error("Error reading photo file", e);
            throw new RuntimeException("Failed to process photo file", e);
        } catch (Exception e) {
            log.error("Error generating PDF", e);
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage(), e);
        }
    }
}