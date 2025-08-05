package com.example.OllamaAiMicroservice.controller;

import com.example.OllamaAiMicroservice.Repositories.CvRepository;
import com.example.OllamaAiMicroservice.dto.BuildRequestDto;
import com.example.OllamaAiMicroservice.dto.CvAnalysisResult;
import com.example.OllamaAiMicroservice.dto.CvMatchResult;
import com.example.OllamaAiMicroservice.entity.CvEntity;
import com.example.OllamaAiMicroservice.entity.FeatureUsage;
import com.example.OllamaAiMicroservice.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CvController {

    private final FileParserService fileParserService;
    private final CvAnalysisService cvAnalysisService;
    private final CvMatchingService cvMatchingService;
    private final CvFeedbackService cvFeedbackService;
    private final CvStorageService cvStorageService;
    private final CvTailoredImprovementService tailoringService;
    private final CloudinaryService cloudinaryService;
    private final CvRepository cvRepository;

    @Autowired
    private CvImprovementService improvementService;

    @Autowired
    private BuildService buildService;

    @Autowired
    private FeatureUsageService featureUsageService;

    @GetMapping("/all-cvs")
    public ResponseEntity<List<CvEntity>> getAllCvs() {
        List<CvEntity> cvs = cvRepository.findAll();
        return ResponseEntity.ok(cvs);
    }

    @GetMapping("/my-cvs")
    public ResponseEntity<List<CvEntity>> getCurrentUserCvs() {
        // User identification must be handled differently, no userSub here
        // Possibly secured by token, so just return empty or all depending on design
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/user-cvs/{userSub}")
    public ResponseEntity<List<CvEntity>> getCvsByUserSub(@PathVariable String userSub) {
        // Removed sub extraction, just use path param
        List<CvEntity> cvs = cvRepository.findByUserSub(userSub);
        return ResponseEntity.ok(cvs);
    }

    @PostMapping("/analyze")
    public ResponseEntity<CvAnalysisResult> analyzeCv(@RequestParam("cv") MultipartFile cvFile) {
        try {
            String cvText = fileParserService.parseFile(cvFile);
            CvAnalysisResult result = cvAnalysisService.analyzeCV(cvText);
            // featureUsageService.log("analyze", userSub);  // removed userSub usage
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/match")
    public ResponseEntity<CvMatchResult> matchCvToJob(
            @RequestParam("cv") MultipartFile cvFile,
            @RequestParam("jobDescription") String jobDescription,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        try {
            String cvText = fileParserService.parseFile(cvFile);
            CvMatchResult result = cvMatchingService.matchCvToJob(cvText, jobDescription);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/build/save")
    public ResponseEntity<CvEntity> saveBuiltCv(
            @RequestBody BuildRequestDto dto,
            HttpServletRequest request) {

        try {
            System.out.println("=== Received Headers ===");
            java.util.Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                System.out.println(headerName + ": " + request.getHeader(headerName));
            }
            System.out.println("=======================");

            String userSub = request.getHeader("X-User-Sub");
            System.out.println("Extracted userSub: " + userSub);

            if (userSub == null || userSub.isEmpty()) {
                System.out.println("ERROR: No X-User-Sub header found in request");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            System.out.println("Processing CV save for user: " + userSub);
            featureUsageService.log("Creation", userSub);

            CvEntity saved = buildService.save(dto, userSub);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            System.out.println("Error saving CV: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/review")
    public ResponseEntity<String> reviewCv(@RequestParam("cv") MultipartFile cvFile) {
        try {
            // featureUsageService.log("review", userSub); removed
            String cvText = fileParserService.parseFile(cvFile);
            String feedback = cvFeedbackService.generateFeedback(cvText);
            return ResponseEntity.ok(feedback);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing CV.");
        }
    }

    @PostMapping(value = "/improve", consumes = "multipart/form-data")
    public ResponseEntity<CvAnalysisResult> improveCv(@RequestParam("file") MultipartFile file) {
        try {
            // featureUsageService.log("improve", userSub); removed
            String cvText = extractTextFromPdf(file.getInputStream());
            CvAnalysisResult improvedCv = improvementService.improveCv(cvText);
            return ResponseEntity.ok(improvedCv);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/tailor")
    public ResponseEntity<CvAnalysisResult> tailorCvToJob(
            @RequestPart("cv") MultipartFile file,
            @RequestPart("jobDescription") String jobDescription) {
        try {
            // featureUsageService.log("tailor", userSub); removed
            String cvText = extractTextFromPdf(file.getInputStream());
            CvAnalysisResult tailoredResult = tailoringService.tailorCvToJob(cvText, jobDescription);
            return ResponseEntity.ok(tailoredResult);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/store")
    public ResponseEntity<CvEntity> storeCv(@RequestBody CvAnalysisResult result) {
        CvEntity saved = cvStorageService.saveCv(result, null); // userSub removed / null
        return ResponseEntity.ok(saved);
    }

    private String extractTextFromPdf(InputStream inputStream) {
        try {
            Tika tika = new Tika();
            return tika.parseToString(inputStream);
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from PDF using Tika", e);
        }
    }

    @GetMapping("/users/{userSub}/cvs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CvEntity>> getCvsByUserSubAdmin(@PathVariable String userSub) {
        return ResponseEntity.ok(cvRepository.findByUserSub(userSub));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/usage-stats")
    public ResponseEntity<Map<String, Long>> getUsageStats() {
        List<FeatureUsage> allUsage = featureUsageService.findAll();
        Map<String, Long> stats = allUsage.stream()
                .collect(Collectors.groupingBy(FeatureUsage::getFeatureName, Collectors.counting()));
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/{userSub}/{cvId}/upload-picture")
    public ResponseEntity<?> uploadProfilePicture(
            @PathVariable String userSub,
            @PathVariable Long cvId,
            @RequestParam("file") MultipartFile file) {
        try {
            Optional<CvEntity> updatedCv = cloudinaryService.uploadProfilePictureAndSave(file, userSub, cvId);
            return updatedCv
                    .map(cv -> ResponseEntity.ok().body(cv))
                    .orElse(ResponseEntity.notFound().build());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }

    @GetMapping("/{userSub}/{cvId}/profile-picture")
    public ResponseEntity<?> getProfilePictureByUserSubAndCvId(
            @PathVariable String userSub,
            @PathVariable Long cvId) {
        Optional<CvEntity> cvOptional = cvRepository.findByIdAndUserSub(cvId, userSub);

        if (cvOptional.isPresent()) {
            CvEntity cv = cvOptional.get();
            String imageUrl = cv.getProfilePictureUrl();

            if (imageUrl == null || imageUrl.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No profile picture found.");
            }

            try {
                InputStream imageStream = new java.net.URL(imageUrl).openStream();
                byte[] imageBytes = imageStream.readAllBytes();

                return ResponseEntity
                        .ok()
                        .header("Content-Type", "image/jpeg")
                        .body(imageBytes);

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to load image from Cloudinary.");
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CV not found.");
        }
    }
}
