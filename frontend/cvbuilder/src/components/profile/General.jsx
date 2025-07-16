import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import AvatarUploader from './avatar-uploader';
import { FaCamera, FaUserCircle } from 'react-icons/fa';

export default function General() {
  const { resumeData } = useResumeStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg flex gap-6">
      {/* Avatar */}
      <div className="relative">
        {resumeData.avatar ? (
          <img
            src={resumeData.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        ) : (
          <FaUserCircle
            className="w-24 h-24 text-gray-300 cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        )}
        <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
          <FaCamera className="text-gray-700 text-sm" />
        </div>
      </div>

      {/* Personal Info Form */}
      <div className="flex-1">
        <PersonalInfoForm />
      </div>

      {showModal && <AvatarUploader onClose={() => setShowModal(false)} />}
    </div>
  );
}

import PersonalInfoForm from '../build-resume/personal-info-form';
