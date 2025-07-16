
import axiosInstance from './axiosInstance';

export const matchCvToJob = async (cvFile, jobDescription) => {
  const formData = new FormData();
  formData.append('cv', cvFile);
  formData.append('jobDescription', jobDescription);

  const response = await axiosInstance.post('/cv/match', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
