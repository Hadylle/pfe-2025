import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function SkillsForm() {
  const { resumeData, updateField } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
  if (!resumeData.skills) {
    updateField('skills', []);
  } else if (resumeData.skills.length && typeof resumeData.skills[0] === 'string') {
    // Convert ["JavaScript", "React"] → [{ value: "JavaScript" }, { value: "React" }]
    const converted = resumeData.skills.map(skill => ({ value: skill }));
    updateField('skills', converted);
  }
}, [resumeData.skills, updateField]);

  const addSkill = () => {
    if (newSkill.trim()) {
      updateField('skills', [...(resumeData.skills || []), { value: newSkill.trim() }]);
      setNewSkill('');
      setIsAdding(false);
    }
  };

  const removeSkill = (index) => {
    const updated = [...resumeData.skills];
    updated.splice(index, 1);
    updateField('skills', updated);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <PlusIcon className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
      </div>

      {resumeData.skills?.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {resumeData.skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill.value}
              <button
                onClick={() => removeSkill(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
                aria-label={`Remove skill ${skill.value}`}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No skills added yet</p>
      )}

      {isAdding ? (
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. React, Photoshop"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={addSkill}
              disabled={!newSkill.trim()}
              className={`px-4 py-2 rounded-md text-white ${
                !newSkill.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Add Skill
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Skill
        </button>
      )}
    </motion.div>
  );
}
