import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function EducationForm() {
  const { resumeData, addArrayItem, removeArrayItem } = useResumeStore();

  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: ''
  });

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addArrayItem('education', newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>

      {resumeData.education?.map((edu, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">{edu.institution}</h3>
              <p className="text-sm text-gray-600">{edu.degree} - {edu.field}</p>
              <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
            </div>
            <button onClick={() => removeArrayItem('education', index)} className="text-red-500 hover:text-red-700">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <input
        type="text"
        placeholder="Institution"
        value={newEducation.institution}
        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="Degree"
        value={newEducation.degree}
        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="Field of Study"
        value={newEducation.field}
        onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="Start Date"
        value={newEducation.startDate}
        onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="End Date"
        value={newEducation.endDate}
        onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={addEducation}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
        Add Education
      </button>
    </motion.div>
  );
}