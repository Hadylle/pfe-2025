import React from 'react';
import { useResumeStore } from '../../store/resume-store';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';

export default function PersonalInfoForm() {
  const { resumeData, updateField } = useResumeStore();

  const { register, watch } = useForm({
    defaultValues: {
      name: resumeData.name,
      email: resumeData.email,
      phone: resumeData.phone,
      address: resumeData.address,
      portfolio: resumeData.portfolio,
      linkedin: resumeData.linkedin,
      github: resumeData.github,
      aboutMe: resumeData.aboutMe
    }
  });

  const watchedFormData = watch();
  const [formData] = useDebounce(watchedFormData, 300); // Debounce by 300ms

  React.useEffect(() => {
    Object.entries(formData).forEach(([field, value]) => {
      if (resumeData[field] !== value) {
        updateField(field, value);
      }
    });
  }, [formData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio</label>
          <input
            {...register('portfolio')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            {...register('linkedin')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub</label>
          <input
            {...register('github')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About Me</label>
          <textarea
            rows={3}
            {...register('aboutMe')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
