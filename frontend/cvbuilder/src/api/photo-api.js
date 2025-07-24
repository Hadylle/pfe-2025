import axiosInstance from './axiosInstance';

export const uploadProfilePicture = async (file, userSub, cvId) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post(
    `/cv/${userSub}/${cvId}/upload-picture`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data; 
};

export const getProfilePicture = async (userSub, cvId) => {
  try {
    const response = await axiosInstance.get(
      `/cv/${userSub}/${cvId}/profile-picture`,
      {
        responseType: 'blob', // Important: get the image as blob
      }
    );
    
    // Create a blob URL for the image
    const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
    const imageUrl = URL.createObjectURL(imageBlob);
    
    return imageUrl;
  } catch (error) {
    if (error.response?.status === 404) {
      return null; // No profile picture found
    }
    throw error;
  }
};