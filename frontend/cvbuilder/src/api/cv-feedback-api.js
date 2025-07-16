import axiosInstance from './axiosInstance';

export async function getCvFeedback(cvFile) {
  const formData = new FormData();
  formData.append('cv', cvFile);

  const response = await axiosInstance.post('/cv/review', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
