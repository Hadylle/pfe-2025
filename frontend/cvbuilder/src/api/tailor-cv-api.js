import axiosInstance from './axiosInstance';

/**
 * Tailors the CV using the job description and returns a generated PDF blob.
 *
 * @param {File} cvFile - The original CV file (PDF).
 * @param {string} jobDescription - The job description text to tailor against.
 * @param {File} [photoFile] - Optional photo file to include in the CV.
 * @returns {Promise<Blob>} - The tailored PDF as a Blob object.
 */
export async function tailorCvAndGeneratePdf(cvFile, jobDescription, photoFile = null) {
  if (!cvFile || !jobDescription.trim()) {
    throw new Error("Both CV and job description are required.");
  }

  // 1. Tailor CV
  const tailorFormData = new FormData();
  tailorFormData.append("cv", cvFile);
  tailorFormData.append("jobDescription", jobDescription);

  const tailorResponse = await axiosInstance.post("/cv/tailor", tailorFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const tailoredCvJson = tailorResponse.data;

  // 2. Generate PDF with tailored CV data (and optional photo)
  const pdfFormData = new FormData();
  pdfFormData.append("cvData", JSON.stringify(tailoredCvJson));
  if (photoFile) {
    pdfFormData.append("photo", photoFile);
  }

  const pdfResponse = await axiosInstance.post("/cv/generate-pdf", pdfFormData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "blob", // PDF will be returned as binary Blob
  });

  return pdfResponse.data; // Blob (PDF)
}
