import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../components/navbar';
import PersonalInfoForm from '../components/build-resume/personal-info-form';
import ExperienceForm from '../components/build-resume/experience-form';
import EducationForm from '../components/build-resume/education-form';
import SkillsForm from '../components/build-resume/skills-form';
import ProjectForm from '../components/build-resume/project-form';
import CertificationForm from '../components/build-resume/certification-form';
import LanguagesInterestsSocialForm from '../components/build-resume/languages-interests-social-form';
import TemplateWrapper from '../components/resume/TemplateWrapper';
import TemplateSelector from '../components/resume/template-selector';
import { useResumeStore } from '../store/resume-store';
import { saveCvBuild } from '../api/cv-build-api';
import { generatePdfFromJson } from '../api/pdf-api';

const forms = [
  { id: 'personal', label: 'Personal Info', Component: PersonalInfoForm },
  { id: 'experience', label: 'Experience', Component: ExperienceForm },
  { id: 'education', label: 'Education', Component: EducationForm },
  { id: 'skills', label: 'Skills', Component: SkillsForm },
  { id: 'projects', label: 'Projects', Component: ProjectForm },
  { id: 'certifications', label: 'Certifications', Component: CertificationForm },
  { id: 'extra', label: 'Languages & Interests', Component: LanguagesInterestsSocialForm }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function BuildResume({ mode = 'default' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const { resumeData } = useResumeStore();
  const CurrentForm = forms[currentStep].Component;

  const handleDownloadPdf = async () => {
    try {
      const blob = await generatePdfFromJson(resumeData);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Updated_Improved_CV.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF");
      console.error(err);
    }
  };

  const nextStep = () => {
    if (currentStep < forms.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveCv = async () => {
    try {
      const savedCv = await saveCvBuild(resumeData);
      alert('CV saved successfully! ✅');
      console.log('Saved CV:', savedCv);
    } catch (error) {
      alert('Failed to save CV ❌');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="mx-auto py-8 px-2 sm:px-4 lg:px-6 w-full max-w-[1400px] flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8 h-full"
        >
          {/* Left: Forms */}
          <div
            className="lg:w-2/5 bg-white p-6 rounded-lg shadow flex flex-col overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 136px)' }}
          >
            <TemplateSelector />

            <div className="flex-1 overflow-y-auto mt-4">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={forms[currentStep].id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <CurrentForm />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded border ${
                  currentStep === 0
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === forms.length - 1}
                className={`px-4 py-2 rounded border ${
                  currentStep === forms.length - 1
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Right: Preview + Buttons */}
          <div
            className="lg:w-3/5 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 136px)' }}
          >
            <div className="bg-white p-4 rounded-t-lg shadow border border-b-0 border-gray-200 flex gap-2 justify-end">
              <button
                onClick={handleSaveCv}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save CV
              </button>
              <button
                onClick={() => setPreviewMode((prev) => !prev)}
                className={`px-4 py-2 rounded-md border ${
                  previewMode
                    ? 'border-blue-600 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-700'
                } hover:bg-blue-50`}
              >
                {previewMode ? 'Show Structure' : 'Preview'}
              </button>
            </div>

            <div className="bg-white rounded-b-lg shadow border border-gray-200 flex-grow overflow-auto p-6">
              {previewMode ? (
                <TemplateWrapper data={resumeData} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Preview will appear here when enabled</p>
                </div>
              )}
            </div>

            {mode === 'edit-after-improve' && (
              <div className="bg-white p-4 rounded-b-lg shadow border-t border-gray-200 flex justify-end">
                <button
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  ✅ Validate and Download PDF
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}