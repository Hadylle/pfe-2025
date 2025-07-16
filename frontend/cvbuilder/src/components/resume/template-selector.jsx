import { useResumeStore } from '../../store/resume-store';
import { motion } from 'framer-motion';

const templates = [
  { id: 'classic', name: 'Classic', description: 'Professional and clean' },
  { id: 'modern', name: 'Modern', description: 'Contemporary design' },
  // Add more templates
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
      
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`p-3 border rounded-lg text-left transition-all ${
              selectedTemplate === template.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}