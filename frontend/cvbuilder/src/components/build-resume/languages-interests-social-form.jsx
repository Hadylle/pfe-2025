import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function EditableList({ title, items, onAdd, onRemove }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    onAdd(inputValue.trim());
    setInputValue('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <ul className="mb-4 space-y-2">
        {items.length === 0 && <p className="text-gray-500 italic">No {title.toLowerCase()} added yet.</p>}
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center bg-gray-100 rounded px-3 py-1">
            <span>{item}</span>
            <button
              onClick={() => onRemove(idx)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove ${item}`}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={`Add ${title.slice(0, -1)}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          aria-label={`Add ${title.slice(0, -1)}`}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add
        </button>
      </div>
    </motion.div>
  );
}

export default function LanguagesInterestsSocialForm() {
  const { resumeData, updateField } = useResumeStore();

  const updateList = (field, newList) => {
    updateField(field, newList);
  };

  return (
    <div className="space-y-6">
      <EditableList
        title="Languages"
        items={resumeData.languages || []}
        onAdd={(val) => updateList('languages', [...(resumeData.languages || []), val])}
        onRemove={(idx) =>
          updateList(
            'languages',
            resumeData.languages.filter((_, i) => i !== idx)
          )
        }
      />
      <EditableList
        title="Interests"
        items={resumeData.interests || []}
        onAdd={(val) => updateList('interests', [...(resumeData.interests || []), val])}
        onRemove={(idx) =>
          updateList(
            'interests',
            resumeData.interests.filter((_, i) => i !== idx)
          )
        }
      />
      <EditableList
        title="Social Clubs"
        items={resumeData.socialClubs || []}
        onAdd={(val) => updateList('socialClubs', [...(resumeData.socialClubs || []), val])}
        onRemove={(idx) =>
          updateList(
            'socialClubs',
            resumeData.socialClubs.filter((_, i) => i !== idx)
          )
        }
      />
    </div>
  );
}
