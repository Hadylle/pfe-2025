package com.example.OllamaAiMicroservice.controller;

import com.example.OllamaAiMicroservice.Repositories.CvRepository;
import com.example.OllamaAiMicroservice.dto.BuildRequestDto;
import com.example.OllamaAiMicroservice.entity.CvEntity;
import com.example.OllamaAiMicroservice.dto.CvAnalysisResult;
import com.example.OllamaAiMicroservice.dto.CvMatchResult;
import com.example.OllamaAiMicroservice.service.*;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

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
    @Autowired
    private final CvRepository cvRepository;

    @Autowired
    private CvImprovementService improvementService;

    @Autowired
    private BuildService buildService;

    // 🔍 Analyze CV using AI
    @PostMapping("/analyze")
    public ResponseEntity<CvAnalysisResult> analyzeCv(
            @RequestParam("cv") MultipartFile cvFile,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        try {
            String cvText = fileParserService.parseFile(cvFile);
            CvAnalysisResult result = cvAnalysisService.analyzeCV(cvText);
            // You may optionally link the result to userSub if needed
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 💾 Save the final built CV
    @PostMapping("/build/save")
    public ResponseEntity<CvEntity> saveBuiltCv(
            @RequestBody BuildRequestDto dto,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        // TODO: optionally set userSub in the dto or CvEntity here
        CvEntity saved = buildService.save(dto, userSub);
        return ResponseEntity.ok(saved);
    }

    // ⚖️ Match CV to job description
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

    // 📋 Review CV and give feedback
    @PostMapping("/review")
    public ResponseEntity<String> reviewCv(
            @RequestParam("cv") MultipartFile cvFile,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        try {
            String cvText = fileParserService.parseFile(cvFile);
            String feedback = cvFeedbackService.generateFeedback(cvText);
            return ResponseEntity.ok(feedback);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing CV.");
        }
    }

    // ✨ Improve the CV with AI
    @PostMapping(value = "/improve", consumes = "multipart/form-data")
    public ResponseEntity<CvAnalysisResult> improveCv(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        try {
            String cvText = extractTextFromPdf(file.getInputStream());
            CvAnalysisResult improvedCv = improvementService.improveCv(cvText);
            return ResponseEntity.ok(improvedCv);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 🧠 Tailor the CV to a job
    @PostMapping("/tailor")
    public ResponseEntity<CvAnalysisResult> tailorCvToJob(
            @RequestPart("cv") MultipartFile file,
            @RequestPart("jobDescription") String jobDescription,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        try {
            String cvText = extractTextFromPdf(file.getInputStream());
            CvAnalysisResult tailoredResult = tailoringService.tailorCvToJob(cvText, jobDescription);
            return ResponseEntity.ok(tailoredResult);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 💽 Store analyzed CV result in database
    @PostMapping("/store")
    public ResponseEntity<CvEntity> storeCv(
            @RequestBody CvAnalysisResult result,
            @RequestHeader("X-User-Sub") String userSub
    ) {
        // You can optionally attach userSub to CvEntity here
        CvEntity saved = cvStorageService.saveCv(result, userSub);
        return ResponseEntity.ok(saved);
    }

    // 📄 PDF text extraction helper
    private String extractTextFromPdf(InputStream inputStream) {
        try {
            Tika tika = new Tika();
            return tika.parseToString(inputStream);
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from PDF using Tika", e);
        }
    }

    @GetMapping("/my-cvs")
    public ResponseEntity<List<CvEntity>> getUserCvs(@RequestHeader("X-User-Sub") String userSub) {
        return ResponseEntity.ok(cvRepository.findByUserSub(userSub));
    }

}
