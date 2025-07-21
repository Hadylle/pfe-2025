// components/resume/TemplateSelector.js
import { useResumeStore } from '../../store/resume-store';
import { motion } from 'framer-motion';

const templates = [
  { 
    id: 'classic', 
    name: 'Classic', 
    description: 'Professional single-column layout',
    previewComponent: 'ClassicPreviewThumbnail' // You would create this component
  },
  { 
    id: 'modern', 
    name: 'Modern', 
    description: 'Contemporary two-column design',
    previewComponent: 'ModernPreviewThumbnail' 
  },
];

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useResumeStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6"
    >
      <h2 className="text-lg font-medium text-gray-800 mb-3">Choose a Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedTemplate === template.id 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                {/* You would render the preview component here */}
                <span className="text-xs text-gray-500">Preview</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}