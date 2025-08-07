import React from 'react';

export default function PhotoComponent({ photo, name = "User" }) {
  if (!photo) {
    // Don't render anything if there's no photo
    return null;
  }

  return (
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600">
      <img
        src={photo}
        alt={`${name}'s profile`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
