import React, { useState } from 'react';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function FormContainer({ title, children, icon: Icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="h-6 w-6 text-purple-600" />}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}