
package com.example.OllamaAiMicroservice.service;

import com.lowagie.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CvPdfGeneratorService {

    private final TemplateEngine templateEngine;

    public byte[] generatePdf(Map<String, Object> cvData) {
        Context context = new Context();
        context.setVariables(cvData);
        String html = templateEngine.process("cv-template", context);

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(outputStream);
            return outputStream.toByteArray();
        } catch (RuntimeException e) {
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage(), e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
