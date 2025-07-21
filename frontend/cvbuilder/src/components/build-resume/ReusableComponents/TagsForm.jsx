
import React, { useState } from 'react';
import { useResumeStore } from '../../../store/resume-store';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
export function TagsForm({ title, storeKey, icon: Icon }) {
  const { resumeData, updateField } = useResumeStore();
  const [newTag, setNewTag] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const items = resumeData[storeKey] || [];

  const addTag = () => {
    if (newTag.trim()) {
      const newItem = typeof items[0] === 'object' ? { value: newTag.trim() } : newTag.trim();
      updateField(storeKey, [...items, newItem]);
      setNewTag('');
      setIsAdding(false);
    }
  };

  const removeTag = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    updateField(storeKey, updated);
  };

  return (
    <FormContainer title={title} icon={Icon}>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {typeof item === 'object' ? item.value : item}
              <button
                onClick={() => removeTag(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
                aria-label={`Remove ${typeof item === 'object' ? item.value : item}`}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mb-4">No {title.toLowerCase()} added yet</p>
      )}

      {isAdding ? (
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder={`e.g. ${title === 'Skills' ? 'React, Photoshop' : 'Add ' + title.slice(0, -1)}`}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={addTag}
              disabled={!newTag.trim()}
              className={`px-4 py-2 rounded-md text-white ${
                !newTag.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Add {title.slice(0, -1)}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add {title.slice(0, -1)}
        </button>
      )}
    </FormContainer>
  );
}