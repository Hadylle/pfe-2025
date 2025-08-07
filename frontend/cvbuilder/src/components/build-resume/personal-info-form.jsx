import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { FormContainer } from './ReusableComponents/FormContainer';

export default function PersonalInfoForm() {
  const { resumeData, updateField } = useResumeStore();
  const [photoPreview, setPhotoPreview] = useState('');
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null); // ✅ declare this!

  const { register, watch, reset } = useForm({
    defaultValues: {
      name: resumeData.name || '',
      email: resumeData.email || '',
      phone: resumeData.phone || '',
      address: resumeData.address || '',
      portfolio: resumeData.portfolio || '',
      linkedin: resumeData.linkedin || '',
      github: resumeData.github || '',
      aboutMe: resumeData.aboutMe || '',
      photo: resumeData.photo || ''
    }
  });

  // Sync resumeData into form
  useEffect(() => {
    reset({
      name: resumeData.name || '',
      email: resumeData.email || '',
      phone: resumeData.phone || '',
      address: resumeData.address || '',
      portfolio: resumeData.portfolio || '',
      linkedin: resumeData.linkedin || '',
      github: resumeData.github || '',
      aboutMe: resumeData.aboutMe || '',
      photo: resumeData.photo || ''
    });
  }, [resumeData, reset]);

  // Debounced form watcher
  const watchedFormData = watch();
  const [formData] = useDebounce(watchedFormData, 300);

  // Update store on changes
  useEffect(() => {
    Object.entries(formData).forEach(([field, value]) => {
      if (resumeData[field] !== value) {
        console.log(`[updateField] ${field}:`, value);
        updateField(field, value);
      }
    });
  }, [formData]);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('[handlePhotoChange] Selected file:', file);

    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setSelectedPhotoFile(file);

    updateField('photo', previewUrl);
    updateField('photoFile', file);
  };

  // Remove photo
  const removePhoto = () => {
    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }

    console.log('[removePhoto] Removed photo preview and file.');
    setPhotoPreview('');
    setSelectedPhotoFile(null);
    updateField('photo', '');
    updateField('photoFile', null);
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
        console.log('[cleanup] Revoked preview URL on unmount.');
      }
    };
  }, [photoPreview]);

  return (
    <FormContainer title="Personal Information">
      <div className="space-y-4">
        {/* Profile Photo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-gray-500">👤</span>
                )}
              </div>
              {photoPreview && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer block w-full px-4 py-2 text-sm font-medium text-center rounded-md border text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                {photoPreview ? 'Change Photo' : 'Upload Photo'}
              </label>
              <p className="text-xs text-gray-500 mt-1">Square images work best (max 2MB)</p>
            </div>
          </div>
        </div>

        {/* Rest of the form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name*</label>
          <input
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email*</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="+1 (123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="123 Main St, City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
          <input
            {...register('portfolio')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            {...register('linkedin')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub</label>
          <input
            {...register('github')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About Me*</label>
          <textarea
            rows={4}
            {...register('aboutMe', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="Brief summary of your professional background and skills..."
          />
        </div>
      </div>
    </FormContainer>
  );
}
