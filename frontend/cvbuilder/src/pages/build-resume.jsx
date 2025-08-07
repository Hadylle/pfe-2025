import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useResumeStore } from '../store/resume-store';
import { saveCvBuild } from '../api/cv-build-api';
import { generatePdfFromJson } from '../api/pdf-api';
import { mockResumeData } from '../constant/mockResume';
import TemplateControls from '../components/resume/TemplateControls';
import PersonalInfoForm from '../components/build-resume/personal-info-form';
import ExperienceForm from '../components/build-resume/experience-form';
import EducationForm from '../components/build-resume/education-form';
import SkillsForm from '../components/build-resume/skills-form';
import ProjectForm from '../components/build-resume/project-form';
import CertificationForm from '../components/build-resume/certification-form';
import LanguagesInterestsSocialForm from '../components/build-resume/languages-interests-social-form';
import TemplateWrapper from '../components/resume/TemplateWrapper';
import TemplateSelector from '../components/resume/template-selector';
import Footer from '../components/footer';
import { componentStyles } from '../styles/components';
import EnhancedReviewBar from '../components/EnhancedReviewBar';

// Separated Components
import ProgressIndicator from '../components/build-resume/ProgressIndicator';
import StepNavigation from '../components/build-resume/StepNavigation';
import ActionButtons from '../components/build-resume/ActionButtons';

const FORM_STEPS = [
  { id: 'personal', label: 'Personal Info', icon: '👤', Component: PersonalInfoForm, description: 'Basic contact information' },
  { id: 'experience', label: 'Experience', icon: '💼', Component: ExperienceForm, description: 'Work history and achievements' },
  { id: 'education', label: 'Education', icon: '🎓', Component: EducationForm, description: 'Academic background' },
  { id: 'skills', label: 'Skills', icon: '🛠️', Component: SkillsForm, description: 'Technical and soft skills' },
  { id: 'projects', label: 'Projects', icon: '🚀', Component: ProjectForm, description: 'Notable projects and work' },
  { id: 'certifications', label: 'Certifications', icon: '📜', Component: CertificationForm, description: 'Professional certifications' },
  { id: 'extra', label: 'Languages & Interests', icon: '🌐', Component: LanguagesInterestsSocialForm, description: 'Additional information' }
];

const ANIMATION_VARIANTS = {
  enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.95 })
};

export default function BuildResume({ mode = 'default' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
const [submittedRating, setSubmittedRating] = useState(false);

  const { resumeData } = useResumeStore();
  const CurrentForm = FORM_STEPS[currentStep].Component;
  const currentStepData = FORM_STEPS[currentStep];
  const handleRatingSubmit = () => {
  setSubmittedRating(true);
};

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCvBuild(resumeData);
      alert('CV saved successfully! ✅');
    } catch (error) {
      alert('Failed to save CV ❌');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await generatePdfFromJson(resumeData);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Updated_Improved_CV.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to generate PDF');
      console.error('Download error:', err);
    }
  };

  const handlePreviewToggle = () => {
    setPreviewMode((prev) => !prev);
  };

  return (
    <div className={componentStyles.layout.pageContainer}>
      <main className="flex-grow p-22 md:p-20 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            
            {/* Left Panel - Form Section */}
            <div className="w-full lg:w-2/5 bg-white border-r border-gray-200">
              <div className="h-full flex flex-col">
                
                {/* Template Selector Section */}
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <TemplateSelector />
                </div>

                {/* Progress Section */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <ProgressIndicator currentStep={currentStep} totalSteps={FORM_STEPS.length} />
                </div>

                {/* Current Step Header */}
                <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{currentStepData.icon}</span>
                    <div>
                      <h3 className="font-semibold text-blue-900">{currentStepData.label}</h3>
                      <p className="text-sm text-blue-700">{currentStepData.description}</p>
                    </div>
                  </div>
                </div>

                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.div
                        key={FORM_STEPS[currentStep].id}
                        custom={direction}
                        variants={ANIMATION_VARIANTS}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full"
                      >
                        <CurrentForm />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Navigation Footer */}
                <div className="px-4 py-3 border-t border-gray-200 bg-white">
                  <StepNavigation
                    currentStep={currentStep}
                    totalSteps={FORM_STEPS.length}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                  />
                </div>
                          {/* Show rating bar after final step */}
          {currentStep === FORM_STEPS.length - 1 && !submittedRating && (
            <div className="px-4 py-4 border-t border-gray-200 bg-white">
              <EnhancedReviewBar
                pageUrl="/cv-builder"
                onSubmitted={handleRatingSubmit}
              />
            </div>
          )}
          {submittedRating && (
            <div className="text-center text-green-600 py-2">
              ✅ Thanks for your feedback!
            </div>
          )}
              </div>
            </div>

            {/* Right Panel - CV Preview Section */}
            <div className="w-full lg:w-3/5 bg-gray-50">
              <div className="h-full flex flex-col">
                
                {/* Controls Header */}
                <div className="px-4 py-3 border-b border-gray-200 bg-white">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <TemplateControls />
                    </div>
                    <div className="flex-shrink-0">
                      <ActionButtons
                        mode={mode}
                        onSave={handleSave}
                        onDownload={handleDownload}
                        onPreviewToggle={handlePreviewToggle}
                        previewMode={previewMode}
                        saving={saving}
                      />
                    </div>
                  </div>
                </div>

                {/* CV Preview - Full Height */}
                <div className="flex-1 overflow-hidden p-4">
                  <div className="h-full bg-white rounded-lg shadow-lg">
                    <AnimatePresence mode="wait">
                      {previewMode ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <TemplateWrapper data={resumeData} />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <TemplateWrapper data={mockResumeData} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <style jsx>{`
        /* Custom scrollbar styles */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        /* Ensure equal height columns */
        @media (min-width: 1024px) {
          .min-h-screen > div {
            height: 100vh;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 1023px) {
          .min-h-screen > div > div {
            min-height: 50vh;
          }
        }
      `}</style>
    </div>
  );
}