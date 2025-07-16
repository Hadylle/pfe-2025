import React from 'react';
import { useResumeStore } from '../../store/resume-store';
import ClassicTemplate from './templates/classic';
import ModernTemplate from './templates/modern';
import { motion } from 'framer-motion';

export default function ResumePreview({ previewMode = false }) {
  const { resumeData, selectedTemplate } = useResumeStore();

  const renderTemplate = () => {
    const props = { data: resumeData, previewMode };
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 min-h-[70vh]"
      style={{ overflow: 'visible' }} 
    >
      <div className="resume-preview-container">{renderTemplate()}</div>
    </motion.div>
  );
}
