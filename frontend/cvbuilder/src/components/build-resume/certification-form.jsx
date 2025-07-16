import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function CertificationForm() {
  const { resumeData, addArrayItem, removeArrayItem } = useResumeStore();

  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    year: ''
  });

  const addCertification = () => {
    if (newCert.title && newCert.issuer) {
      addArrayItem('certifications', newCert);
      setNewCert({ title: '', issuer: '', year: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Certifications</h2>

      {resumeData.certifications?.map((cert, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-100 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-medium">{cert.title}</h3>
            <p className="text-sm text-gray-600">{cert.issuer} - {cert.year}</p>
          </div>
          <button onClick={() => removeArrayItem('certifications', index)} className="text-red-500 hover:text-red-700">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}

      <input
        type="text"
        placeholder="Certification Title"
        value={newCert.title}
        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="Issuer"
        value={newCert.issuer}
        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="Year"
        value={newCert.year}
        onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={addCertification}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
        Add Certification
      </button>
    </motion.div>
  );
}
