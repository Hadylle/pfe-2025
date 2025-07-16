import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import cvAnimation from '../assets/cvAnimation.json';

import { analyzeCvFile } from '../api/cv-analyze-api';
import { useResumeStore } from '../store/resume-store';

import General from '../components/profile/General';
import ExperienceForm from '../components/build-resume/experience-form';
import EducationForm from '../components/build-resume/education-form';
import SkillsForm from '../components/build-resume/skills-form';
import ProjectForm from '../components/build-resume/project-form';
import CertificationForm from '../components/build-resume/Certification-form';
import LanguagesInterestsSocialForm from '../components/build-resume/languages-interests-social-form';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { setAllData } = useResumeStore();

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await analyzeCvFile(file);
      setAllData(result); // Fills the form fields
      alert('✅ CV parsed and filled successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to analyze CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Lottie Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white bg-opacity-90 flex items-center justify-center">
          <Lottie animationData={cvAnimation} loop autoplay style={{ width: 300, height: 300 }} />
        </div>
      )}

      {/* ✅ Page Layout */}
      <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
        {/* General Info (Avatar + Personal Fields) */}
        <General />

        {/* Upload CV */}
        <div className="my-6 bg-white p-4 rounded-md shadow flex flex-col md:flex-row items-center justify-between gap-4">
          <label className="font-medium">Upload CV (PDF to auto-fill):</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleCvUpload}
            className="text-sm"
          />
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-5"><ExperienceForm /></div>
          <div className="bg-white rounded-lg shadow p-5"><EducationForm /></div>
          <div className="bg-white rounded-lg shadow p-5"><SkillsForm /></div>
          <div className="bg-white rounded-lg shadow p-5"><CertificationForm /></div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 mt-6"><ProjectForm /></div>
        <div className="bg-white rounded-lg shadow p-5 mt-6"><LanguagesInterestsSocialForm /></div>
      </div>
    </>
  );
}
