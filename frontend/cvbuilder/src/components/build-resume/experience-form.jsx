import { FormContainer } from "./ReusableComponents/FormContainer";
import React, { useState } from 'react';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useResumeStore } from '../../store/resume-store';
import { ArrayInput } from "./ReusableComponents/ArrayInput";
export default function ExperienceForm() {
  const { resumeData, addArrayItem, removeArrayItem } = useResumeStore();
  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    duration: '',
    achievements: [''],
    techStack: ['']
  });

  const updateField = (field, value) => {
    setNewExperience(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.role) {
      const expToAdd = {
        ...newExperience,
        achievements: newExperience.achievements.filter(a => a.trim() !== ''),
        techStack: newExperience.techStack.filter(t => t.trim() !== ''),
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
    <FormContainer title="Work Experience">
      {/* Display existing experiences */}
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
            <button 
              onClick={() => removeArrayItem('experience', index)} 
              className="text-red-500 hover:text-red-700"
            >
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
       {/* Form inputs */}
      <div className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Job Title"
          value={newExperience.role}
          onChange={(e) => updateField('role', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Duration (e.g. Jan 2020 - Dec 2021)"
          value={newExperience.duration}
          onChange={(e) => updateField('duration', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <ArrayInput
          label="Achievements"
          items={newExperience.achievements}
          onUpdate={(items) => updateField('achievements', items)}
          placeholder="Achievement description"
        />

        <ArrayInput
          label="Tech Stack"
          items={newExperience.techStack}
          onUpdate={(items) => updateField('techStack', items)}
          placeholder="Technology or tool"
        />

        <button
          onClick={addExperience}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Experience
        </button>
      </div>
    </FormContainer>
  );
}

