import axiosInstance from './axiosInstance';

export const saveCvBuild = async (cvData) => {
  try {
    const response = await axiosInstance.post('/cv/build/save', cvData);
    return response.data;
  } catch (error) {
    console.error('Error saving CV:', error);
    throw error;
  }
};
