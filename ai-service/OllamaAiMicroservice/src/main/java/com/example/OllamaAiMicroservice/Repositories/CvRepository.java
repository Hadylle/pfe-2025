package com.example.OllamaAiMicroservice.Repositories;

import com.example.OllamaAiMicroservice.entity.CvEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CvRepository extends JpaRepository<CvEntity, Long> {
    List<CvEntity> findByUserSub(String userSub);
    Optional<CvEntity> findByIdAndUserSub(Long id, String userSub);

}
