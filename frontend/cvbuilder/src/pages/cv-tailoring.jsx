import { useState } from "react";
import robotAnimation from "../assets/robot.json";

import Footer from "../components/footer";
import LottieHeader from "../components/features/LottieHeader";
import CVUploadForm from "../components/features/CVUploadForm";
import BuildResume from "./build-resume"; // Import BuildResume

import { tailorCv } from "../api/tailor-cv-api"; // Your API function returns JSON only
import { useProgress } from "../components/ProgressContext";

import { useResumeStore } from "../store/resume-store"; // Zustand store to save JSON

export default function CvTailoringPage() {
  const [cvFile, setCvFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const { start, complete, error } = useProgress();
  const { setAllData } = useResumeStore();

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleTailorCv = async () => {
    if (!cvFile || !jobText.trim()) {
      alert("Please upload your CV and paste the job description.");
      return;
    }

    start("Tailoring your CV to match the job...");
    setErrorMessage("");
    setShowEditor(false);

    try {
      // Call your API - expecting JSON response only
      const tailoredJson = await tailorCv(cvFile, jobText);

      // Save tailored JSON to global store
      setAllData(tailoredJson);

      complete();
      setShowEditor(true); // Show the editor with loaded data
    } catch (err) {
      console.error("❌ Tailoring error:", err);
      setErrorMessage("Something went wrong while generating your tailored CV.");
      error();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full max-w-full py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {!showEditor ? (
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <LottieHeader
              animationData={robotAnimation}
              text="Upload your CV and job offer to generate a tailored version for better matching."
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

            {errorMessage && (
              <div className="text-red-600 text-center mt-6 w-full">
                {errorMessage}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12 w-full">
            <BuildResume mode="edit-after-tailor" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
