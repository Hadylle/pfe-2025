import axiosInstance from './axiosInstance';

export const generatePdfFromJson = async (cvData) => {
  const formData = new FormData();
  formData.append("cvData", JSON.stringify(cvData));

  const response = await axiosInstance.post('/cv/generate-pdf', formData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: 'blob',
  });

  return response.data; // Blob
};
