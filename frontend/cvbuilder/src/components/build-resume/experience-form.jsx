import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ExperienceForm() {
  const { resumeData, addArrayItem, removeArrayItem } = useResumeStore();
  
  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    duration: '',
    achievements: [''],
    techStack: ['']
  });

  // Helpers for achievements and techStack inputs
  const updateArrayField = (field, index, value) => {
    const updated = [...newExperience[field]];
    updated[index] = value;
    setNewExperience({ ...newExperience, [field]: updated });
  };

  const addArrayFieldItem = (field) => {
    setNewExperience({ ...newExperience, [field]: [...newExperience[field], ''] });
  };

  const removeArrayFieldItem = (field, index) => {
    const updated = newExperience[field].filter((_, i) => i !== index);
    setNewExperience({ ...newExperience, [field]: updated.length ? updated : [''] });
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.role) {
      // Filter out empty strings for achievements and techStack
      const expToAdd = {
        ...newExperience,
        achievements: newExperience.achievements.filter((a) => a.trim() !== ''),
        techStack: newExperience.techStack.filter((t) => t.trim() !== ''),
      };
      addArrayItem('experience', expToAdd);
      setNewExperience({
        company: '',
        role: '',
        duration: '',
        achievements: [''],
        techStack: [''],
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>

      {resumeData.experience?.map((exp, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="font-medium">{exp.role}</h3>
              <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
              {exp.techStack?.length > 0 && (
                <p className="text-sm text-gray-500 italic">Tech Stack: {exp.techStack.join(', ')}</p>
              )}
            </div>
            <button onClick={() => removeArrayItem('experience', index)} className="text-red-500 hover:text-red-700">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          {exp.achievements?.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {exp.achievements.map((ach, i) => (
                <li key={i} className="text-sm text-gray-600">{ach}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Job Title"
          value={newExperience.role}
          onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Duration (e.g. Jan 2020 - Dec 2021)"
          value={newExperience.duration}
          onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        {/* Achievements inputs */}
        <div>
          <label className="block font-medium mb-1">Achievements</label>
          {newExperience.achievements.map((ach, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                type="text"
                value={ach}
                onChange={(e) => updateArrayField('achievements', idx, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Achievement description"
              />
              <button
                onClick={() => removeArrayFieldItem('achievements', idx)}
                type="button"
                className="text-red-500 hover:text-red-700"
                aria-label="Remove achievement"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayFieldItem('achievements')}
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Achievement
          </button>
        </div>

        {/* Tech Stack inputs */}
        <div>
          <label className="block font-medium mb-1">Tech Stack</label>
          {newExperience.techStack.map((tech, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                type="text"
                value={tech}
                onChange={(e) => updateArrayField('techStack', idx, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Technology or tool"
              />
              <button
                onClick={() => removeArrayFieldItem('techStack', idx)}
                type="button"
                className="text-red-500 hover:text-red-700"
                aria-label="Remove tech"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayFieldItem('techStack')}
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Tech
          </button>
        </div>

        <button
          onClick={addExperience}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Experience
        </button>
      </div>
    </motion.div>
  );
}
