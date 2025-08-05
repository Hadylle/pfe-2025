import axiosInstance from './axiosInstance';

/**
 * Improves the CV and returns both structured data and a generated PDF blob.
 *
 * @param {File} file - The original CV file (PDF).
 * @returns {Promise<{ improvedJson: Object, improvedPdf: Blob }>}
 */
export async function improveCvAndGeneratePdf(file) {
  if (!file) throw new Error("CV file is required.");

  const formData = new FormData();
  formData.append('file', file);

  const improveResponse = await axiosInstance.post('/cv/improve', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  const improvedJson = improveResponse.data;
  console.log('📦 Improved JSON received from backend:', improvedJson);

  const pdfFormData = new FormData();
  pdfFormData.append("cvData", JSON.stringify(improvedJson));

  const pdfResponse = await axiosInstance.post('/cv/generate-pdf', pdfFormData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: 'blob'
  });

  const improvedPdf = pdfResponse.data;

  return { improvedJson, improvedPdf };
}
