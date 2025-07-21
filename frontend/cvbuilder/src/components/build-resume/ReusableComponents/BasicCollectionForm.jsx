import React, { useState } from 'react';
import { useResumeStore } from '../../../store/resume-store';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FormContainer } from './FormContainer';
export function BasicCollectionForm({ 
  title, 
  storeKey, 
  fields, 
  renderItem, 
  validation,
  initialState,
  icon: Icon 
}) {
  const { resumeData, addArrayItem, removeArrayItem } = useResumeStore();
  const [formState, setFormState] = useState(initialState);

  const updateField = (fieldName, value) => {
    setFormState(prev => ({ ...prev, [fieldName]: value }));
  };

  const addItem = () => {
    const isValid = validation.every(field => formState[field] && formState[field].trim());
    
    if (isValid) {
      addArrayItem(storeKey, formState);
      setFormState(initialState);
    }
  };

  return (
    <FormContainer title={title} icon={Icon}>
      {/* Display existing items */}
      {resumeData[storeKey]?.map((item, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-grow">
              {renderItem(item)}
            </div>
            <button 
              onClick={() => removeArrayItem(storeKey, index)} 
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Form inputs */}
      <div className="space-y-4 mt-4">
        {fields.map(field => (
          <input
            key={field.name}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={formState[field.name]}
            onChange={(e) => updateField(field.name, e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        ))}

        <button
          onClick={addItem}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add {title.slice(0, -1)}
        </button>
      </div>
    </FormContainer>
  );
}
