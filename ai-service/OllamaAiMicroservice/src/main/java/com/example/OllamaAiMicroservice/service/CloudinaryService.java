package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.Repositories.CvRepository;
import com.example.OllamaAiMicroservice.entity.CvEntity;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;
    private final CvRepository cvRepository;

    public CloudinaryService(CvRepository cvRepository) {
        this.cvRepository = cvRepository;

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dheuurohu",
                "api_key", "188488441947215",
                "api_secret", "wKKxURCKNcywoI4TOcQ32La2dDA"
        ));
    }

    public Map<String, Object> uploadFile(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    }
    @Transactional
    public Optional<CvEntity> uploadProfilePictureAndSave(MultipartFile file, String userSub, Long cvId) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String imageUrl = (String) uploadResult.get("url");

        Optional<CvEntity> optionalCv = cvRepository.findByIdAndUserSub(cvId, userSub);
        if (optionalCv.isPresent()) {
            CvEntity cv = optionalCv.get();
            cv.setProfilePictureUrl(imageUrl);
            cvRepository.save(cv);
            return Optional.of(cv);
        }
        return Optional.empty();
    }

}
