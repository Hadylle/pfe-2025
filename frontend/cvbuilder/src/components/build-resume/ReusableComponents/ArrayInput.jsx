import React, { useState } from 'react';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function ArrayInput({ label, items, onUpdate, placeholder }) {
  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onUpdate(updated);
  };

  const addItem = () => {
    onUpdate([...items, '']);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onUpdate(updated.length ? updated : ['']);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center mb-1 gap-2">
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(e) => updateItem(idx, e.target.value)}
            className="flex-grow border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="text-red-500 hover:text-red-700"
            aria-label={`Remove ${label}`}
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="mt-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
      >
        Add {label}
      </button>
    </div>
  );
}