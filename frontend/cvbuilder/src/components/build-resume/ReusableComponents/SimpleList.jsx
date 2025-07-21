
import React, { useState } from 'react';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FormContainer } from './FormContainer';
export function SimpleList({ title, items, onAdd, onRemove, placeholder, icon: Icon }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    onAdd(inputValue.trim());
    setInputValue('');
  };

  return (
    <FormContainer title={title} icon={Icon}>
      <ul className="mb-4 space-y-2">
        {items.length === 0 && (
          <p className="text-gray-500 italic">No {title.toLowerCase()} added yet.</p>
        )}
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
          placeholder={placeholder || `Add ${title.slice(0, -1)}`}
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
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add
        </button>
      </div>
    </FormContainer>
  );
}
