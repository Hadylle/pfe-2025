import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { FormContainer } from './ReusableComponents/FormContainer';
import { uploadProfilePicture, getProfilePicture } from '../../api/photo-api';

export default function PersonalInfoForm() {
  const { resumeData, updateField } = useResumeStore();
  const [photoPreview, setPhotoPreview] = useState('');
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

  const { register, watch } = useForm({
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

  const watchedFormData = watch();
  const [formData] = useDebounce(watchedFormData, 300);

  // Load existing profile picture on component mount
  useEffect(() => {
    const loadExistingPhoto = async () => {
      const userSub = localStorage.getItem('userSub');
      const cvId = resumeData.id;
      
      if (userSub && cvId) {
        setIsLoadingPhoto(true);
        try {
          const imageUrl = await getProfilePicture(userSub, cvId);
          if (imageUrl) {
            setPhotoPreview(imageUrl);
            updateField('photo', imageUrl);
          }
        } catch (error) {
          console.error('Failed to load existing photo:', error);
        } finally {
          setIsLoadingPhoto(false);
        }
      }
    };

    // Only load if we don't already have a photo preview
    if (!photoPreview && resumeData.id) {
      loadExistingPhoto();
    }
  }, [resumeData.id, updateField]);

  // Handle form data changes
  useEffect(() => {
    Object.entries(formData).forEach(([field, value]) => {
      if (resumeData[field] !== value) {
        updateField(field, value);
      }
    });
  }, [formData, resumeData, updateField]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoadingPhoto(true);
        const userSub = localStorage.getItem('userSub');
        const cvId = resumeData.id;
        
        const updatedCv = await uploadProfilePicture(file, userSub, cvId);
        
        // If the backend returns the full CV object with photo URL
        if (updatedCv.profilePictureUrl) {
          setPhotoPreview(updatedCv.profilePictureUrl);
          updateField('photo', updatedCv.profilePictureUrl);
        } else {
          // Fallback: fetch the photo again to get the URL
          const imageUrl = await getProfilePicture(userSub, cvId);
          if (imageUrl) {
            setPhotoPreview(imageUrl);
            updateField('photo', imageUrl);
          }
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload photo. Please try again.');
      } finally {
        setIsLoadingPhoto(false);
      }
    }
  };

  const removePhoto = async () => {
    // Clean up blob URL if it exists
    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
    
    setPhotoPreview('');
    updateField('photo', '');
    
    // Note: You might want to add a delete endpoint to actually remove 
    // the photo from Cloudinary and database
  };

  // Clean up blob URLs on component unmount
  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, []);

  return (
    <FormContainer title="Personal Information">
      <div className="space-y-4">
        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {isLoadingPhoto ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                ) : photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl text-gray-500">👤</span>
                )}
              </div>
              {photoPreview && !isLoadingPhoto && (
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
                disabled={isLoadingPhoto}
              />
              <label
                htmlFor="photo-upload"
                className={`cursor-pointer block w-full px-4 py-2 text-sm font-medium text-center rounded-md border ${
                  isLoadingPhoto 
                    ? 'text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed' 
                    : 'text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200'
                }`}
              >
                {isLoadingPhoto ? 'Processing...' : photoPreview ? 'Change Photo' : 'Upload Photo'}
              </label>
              <p className="text-xs text-gray-500 mt-1">Square images work best (max 2MB)</p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name*</label>
          <input
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email*</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="+1 (123) 456-7890"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="123 Main St, City, Country"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
          <input
            {...register('portfolio')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="https://yourportfolio.com"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            {...register('linkedin')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub</label>
          <input
            {...register('github')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="https://github.com/yourusername"
          />
        </div>

        {/* About Me */}
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