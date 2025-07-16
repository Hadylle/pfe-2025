import { useState } from "react";
import robotAnimation from "../assets/robot.json";

import Footer from "../components/footer";
import LottieHeader from "../components/features/LottieHeader";
import CVUploadForm from "../components/features/CVUploadForm";
import CvDisplay from "../components/features/CvDisplay";
import { tailorCvAndGeneratePdf } from "../api/tailor-cv-api";
import { useProgress } from "../components/ProgressContext"; // ✅ Added

export default function CvTailoringPage() {
  const [cvFile, setCvFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { start, complete, error } = useProgress(); // ✅ Progress context

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleTailorCv = async () => {
    if (!cvFile || !jobText.trim()) {
      alert("Please upload your CV and paste the job description.");
      return;
    }

    start("Tailoring your CV to match the job..."); // ✅ Show progress
    setPdfUrl(null);
    setErrorMessage("");

    try {
      const pdfBlob = await tailorCvAndGeneratePdf(cvFile, jobText);
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(blobUrl);
      complete(); // ✅ Mark as complete
    } catch (err) {
      console.error("❌ Tailoring error:", err);
      setErrorMessage("Something went wrong while generating your tailored CV.");
      error(); // ✅ Mark as error
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff]">
      <main className="flex-1 max-w-6xl mx-auto py-12 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <LottieHeader
            animationData={robotAnimation}
            text="Uppload your CV and job offer to generate a tailored version for better matching."
          />

          <CVUploadForm
            onFileChange={handleFileChange}
            onSubmit={handleTailorCv}
            buttonLabel="🎯 Tailor My CV"
            buttonColor="#0091e3"
            buttonHover="#0c549f"
          >
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Paste Job Description
              </label>
              <textarea
                rows={5}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Enter job offer text here..."
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-[#00ddb3]"
              />
            </div>
          </CVUploadForm>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-center mt-6">{errorMessage}</div>
        )}

        {pdfUrl && (
          <CvDisplay
            title="📄 Tailored CV Generated"
            pdfSrc={pdfUrl}
            downloadName="Tailored_CV.pdf"
            buttonColor="#2defcf"
            textColor="#1b4977"
          />
        )}
      </main>

    </div>
  );
}
