import React, { useState, useEffect } from 'react';
import { getProfilePicture } from '../../api/photo-api';

export default function PhotoComponent({ 
  photo, 
  name = "User", 
  userSub = null, 
  cvId = null,
  useApi = false // Flag to determine whether to use API or direct photo prop
}) {
  const [imageUrl, setImageUrl] = useState(photo || '');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // If useApi is true and we have userSub and cvId, fetch from API
    if (useApi && userSub && cvId && !photo) {
      const fetchProfilePicture = async () => {
        setIsLoading(true);
        try {
          const fetchedImageUrl = await getProfilePicture(userSub, cvId);
          if (fetchedImageUrl) {
            setImageUrl(fetchedImageUrl);
          }
        } catch (error) {
          console.error('Failed to fetch profile picture:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfilePicture();
    } else if (photo) {
      setImageUrl(photo);
    }

    // Cleanup blob URLs when component unmounts or photo changes
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [photo, userSub, cvId, useApi]);

  const handleImageError = () => {
    setImageError(true);
    // Clean up blob URL if it failed to load
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show fallback if no image or image failed to load
  if (!imageUrl || imageError) {
    return (
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 flex items-center justify-center">
        <span className="text-5xl md:text-6xl text-blue-600 font-semibold">
          {name.split(' ').map(n => n[0]).join('').toUpperCase() || '👤'}
        </span>
      </div>
    );
  }

  return (
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600">
      <img 
        src={imageUrl}
        alt={`${name}'s profile`}
        className="w-full h-full object-cover"
        onError={handleImageError}
        onLoad={() => setImageError(false)} // Reset error state on successful load
      />
    </div>
  );
}