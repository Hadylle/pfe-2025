import axiosInstance from './axiosInstance';

export const analyzeCvFile = async (file) => {
  const formData = new FormData();
  formData.append('cv', file);

  try {
    const res = await axiosInstance.post('/cv/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('API response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
