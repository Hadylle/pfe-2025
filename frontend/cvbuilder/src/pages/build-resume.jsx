// pages/BuildResume.jsx - Fully refactored using new styling system
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { cn } from '../utils/className';

import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { componentStyles } from '../styles/components';
import { useResumeStore } from '../store/resume-store';
import { saveCvBuild } from '../api/cv-build-api';
import { generatePdfFromJson } from '../api/pdf-api';

// Import form components
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

// Form configuration with enhanced metadata
const FORM_STEPS = [
  { 
    id: 'personal', 
    label: 'Personal Info', 
    icon: '👤',
    Component: PersonalInfoForm,
    description: 'Basic contact information'
  },
  { 
    id: 'experience', 
    label: 'Experience', 
    icon: '💼',
    Component: ExperienceForm,
    description: 'Work history and achievements'
  },
  { 
    id: 'education', 
    label: 'Education', 
    icon: '🎓',
    Component: EducationForm,
    description: 'Academic background'
  },
  { 
    id: 'skills', 
    label: 'Skills', 
    icon: '🛠️',
    Component: SkillsForm,
    description: 'Technical and soft skills'
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    icon: '🚀',
    Component: ProjectForm,
    description: 'Notable projects and work'
  },
  { 
    id: 'certifications', 
    label: 'Certifications', 
    icon: '📜',
    Component: CertificationForm,
    description: 'Professional certifications'
  },
  { 
    id: 'extra', 
    label: 'Languages & Interests', 
    icon: '🌐',
    Component: LanguagesInterestsSocialForm,
    description: 'Additional information'
  }
];

// Animation variants for smooth transitions
const ANIMATION_VARIANTS = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  })
};

// Progress indicator component
function ProgressIndicator({ currentStep, totalSteps }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// Step navigation component
function StepNavigation({ currentStep, totalSteps, onPrevious, onNext }) {
  return (
    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </Button>

      <div className="flex space-x-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-colors duration-200',
              index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
            )}
          />
        ))}
      </div>

      <Button
        variant="primary"
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex items-center space-x-2"
      >
        <span>Next</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
}

// Action buttons component
function ActionButtons({ mode, onSave, onDownload, onPreviewToggle, previewMode, saving = false }) {
  return (
    <div className="bg-white p-4 rounded-t-lg shadow border border-b-0 border-gray-200">
      <div className="flex flex-wrap gap-3 justify-end">
        <Button
          variant="success"
          onClick={onSave}
          disabled={saving}
          className="flex items-center space-x-2"
        >
          {saving && <LoadingSpinner size="sm" />}
          <span>💾 Save CV</span>
        </Button>

        <Button
          variant={previewMode ? 'primary' : 'outline'}
          onClick={onPreviewToggle}
          className="flex items-center space-x-2"
        >
          <span>{previewMode ? '📝 Edit Mode' : '👁️ Preview'}</span>
        </Button>

        {mode === 'edit-after-improve' && (
          <Button
            variant="primary"
            onClick={onDownload}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <span>✅ Download PDF</span>
          </Button>
        )}
      </div>
    </div>
  );
}

// Main BuildResume component
export default function BuildResume({ mode = 'default' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const { resumeData } = useResumeStore();
  const CurrentForm = FORM_STEPS[currentStep].Component;
  const currentStepData = FORM_STEPS[currentStep];

  // Navigation handlers
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

  // Action handlers
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
    setPreviewMode(prev => !prev);
  };

  return (
    <div className={componentStyles.layout.pageContainer}>
      <main className="mx-auto py-8 px-2 sm:px-4 lg:px-6 w-full max-w-[1400px] flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8 h-full"
        >
          {/* Left Panel - Forms */}
          <div className="lg:w-2/5">
            <Card
              className="h-full flex flex-col"
              style={{ maxHeight: 'calc(100vh - 136px)' }}
            >
              {/* Template Selector */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <TemplateSelector />
              </div>

              {/* Progress Indicator */}
              <ProgressIndicator 
                currentStep={currentStep} 
                totalSteps={FORM_STEPS.length} 
              />

              {/* Current Step Info */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{currentStepData.icon}</span>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      {currentStepData.label}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Container */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={FORM_STEPS[currentStep].id}
                    custom={direction}
                    variants={ANIMATION_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ 
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="w-full"
                  >
                    <CurrentForm />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <StepNavigation
                currentStep={currentStep}
                totalSteps={FORM_STEPS.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div 
            className="lg:w-3/5 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 136px)' }}
          >
            {/* Action Buttons */}
            <ActionButtons
              mode={mode}
              onSave={handleSave}
              onDownload={handleDownload}
              onPreviewToggle={handlePreviewToggle}
              previewMode={previewMode}
              saving={saving}
            />

            {/* Preview Container */}
            <Card className="flex-grow overflow-auto rounded-t-none border-t-0">
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
                    <TemplateWrapper data={resumeData} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center text-gray-400 space-y-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <div>
                        <p className="text-lg font-medium">Preview Mode</p>
                        <p className="text-sm">Click "👁️ Preview" to see your resume</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </motion.div>
         <Footer/>
      </main>
     
    </div>
  );
}