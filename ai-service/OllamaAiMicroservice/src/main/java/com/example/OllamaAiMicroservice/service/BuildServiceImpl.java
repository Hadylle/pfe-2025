package com.example.OllamaAiMicroservice.service;

import com.example.OllamaAiMicroservice.dto.BuildRequestDto;
import com.example.OllamaAiMicroservice.entity.*;
import com.example.OllamaAiMicroservice.Repositories.CvRepository;
import com.example.OllamaAiMicroservice.service.BuildService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildServiceImpl implements BuildService {

    private final CvRepository cvRepository;

    @Override
    public CvEntity save(BuildRequestDto dto, String userSub) {
        CvEntity cv = new CvEntity();

        cv.setName(dto.getName());
        cv.setEmail(dto.getEmail());
        cv.setPhone(dto.getPhone());
        cv.setAddress(dto.getAddress());
        cv.setPortfolio(dto.getPortfolio());
        cv.setLinkedin(dto.getLinkedin());
        cv.setGithub(dto.getGithub());
        cv.setAboutMe(dto.getAboutMe());
        cv.setUserSub(userSub);

        cv.setLanguages(dto.getLanguages());
        cv.setInterests(dto.getInterests());
        cv.setSocialClubs(dto.getSocialClubs());

        cv.setSkills(dto.getSkills().stream().map(s -> {
            Skill skill = new Skill();
            skill.setValue(s.getValue());
            skill.setCv(cv);
            return skill;
        }).collect(Collectors.toList()));

        cv.setEducation(dto.getEducation().stream().map(e -> {
            Education ed = new Education();
            ed.setInstitution(e.getInstitution());
            ed.setDegree(e.getDegree());
            ed.setField(e.getField());
            ed.setStartDate(e.getStartDate());
            ed.setEndDate(e.getEndDate());
            ed.setCv(cv);
            return ed;
        }).collect(Collectors.toList()));

        cv.setExperience(dto.getExperience().stream().map(e -> {
            Experience exp = new Experience();
            exp.setCompany(e.getCompany());
            exp.setRole(e.getRole());
            exp.setDuration(e.getDuration());
            exp.setAchievements(e.getAchievements());
            exp.setTechStack(e.getTechStack());
            exp.setCv(cv);
            return exp;
        }).collect(Collectors.toList()));

        cv.setProjects(dto.getProjects().stream().map(p -> {
            Project pr = new Project();
            pr.setTitle(p.getTitle());
            pr.setDescription(p.getDescription());
            pr.setLink(p.getLink());
            pr.setTechStack(p.getTechStack());
            pr.setCv(cv);
            return pr;
        }).collect(Collectors.toList()));

        cv.setCertifications(dto.getCertifications().stream().map(c -> {
            Certification cert = new Certification();
            cert.setTitle(c.getTitle());
            cert.setIssuer(c.getIssuer());
            cert.setYear(c.getYear());
            cert.setCv(cv);
            return cert;
        }).collect(Collectors.toList()));

        return cvRepository.save(cv);
    }
}
