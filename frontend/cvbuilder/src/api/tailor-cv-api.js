import axiosInstance from './axiosInstance';

/**
 * Tailors the CV using the job description and returns tailored JSON data.
 *
 * @param {File} cvFile - The original CV file (PDF).
 * @param {string} jobDescription - The job description text to tailor against.
 * @returns {Promise<Object>} - The tailored CV JSON data.
 */
export async function tailorCv(cvFile, jobDescription) {
  if (!cvFile || !jobDescription.trim()) {
    throw new Error("Both CV and job description are required.");
  }

  const formData = new FormData();
  formData.append("cv", cvFile);
  formData.append("jobDescription", jobDescription);

  const response = await axiosInstance.post("/cv/tailor", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // Tailored CV JSON
}
