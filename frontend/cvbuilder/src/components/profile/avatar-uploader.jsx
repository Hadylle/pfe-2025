// components/profile/AvatarUploader.jsx
import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { FaCamera } from 'react-icons/fa';

import avatar1 from '../../assets/avatars/1.png';
import avatar2 from '../../assets/avatars/2.png';
import avatar3 from '../../assets/avatars/3.png';
import avatar4 from '../../assets/avatars/4.png';
import avatar5 from '../../assets/avatars/5.png';
import avatar6 from '../../assets/avatars/6.png';
import avatar7 from '../../assets/avatars/7.png';
import avatar8 from '../../assets/avatars/8.png';
import avatar9 from '../../assets/avatars/9.png';
import avatar10 from '../../assets/avatars/10.png';
import avatar11 from '../../assets/avatars/11.png';

const avatars = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6,
  avatar7, avatar8, avatar9, avatar10, avatar11,
];

export default function AvatarUploader({ onClose }) {
  const { updateField } = useResumeStore();
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setSelected(null);
    }
  };

  const handleConfirm = () => {
    if (preview) updateField('avatar', preview);
    else if (selected) updateField('avatar', selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-center mb-4">Choose or Upload Avatar</h2>
        <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />

        <div className="grid grid-cols-5 gap-2 mb-4">
          {avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              onClick={() => {
                setSelected(src);
                setPreview(null);
              }}
              className={`w-14 h-14 rounded-full cursor-pointer border-2 ${
                selected === src ? 'border-blue-500' : 'border-transparent'
              }`}
            />
          ))}
        </div>

        {(preview || selected) && (
          <div className="text-center mb-4">
            <img
              src={preview || selected}
              className="w-20 h-20 rounded-full border mx-auto"
            />
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}