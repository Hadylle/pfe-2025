// src/components/resume/TemplateSelector.js

import { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cvImage from '../../assets/cv.jpg';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Professional single-column layout',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Professional two-column design',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong visual sidebar layout',
  },
  {
    id: 'clean',
    name: 'Clean',
    description: 'Clean and modern',
  },
];

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useResumeStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleTemplates = templates.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex < templates.length - 3) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="w-full relative bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">🎨 Choose Your Resume Template</h2>

      {/* Navigation Arrows */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          disabled={currentIndex >= templates.length - 3}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-30"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Animated Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-transform">
        <AnimatePresence mode="wait">
          {visibleTemplates.map((template, i) => (
            <motion.button
              key={template.id}
              onClick={() => setTemplate(template.id)}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className={`p-4 border-2 rounded-xl shadow-md bg-white hover:scale-[1.02] transform transition-all text-left ${
                selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex gap-4">
                <div className="w-28 h-36 overflow-hidden bg-gray-100 rounded shadow-inner flex-shrink-0 border">
                  <img
                    src={cvImage}
                    alt={`${template.name} Preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                 
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
