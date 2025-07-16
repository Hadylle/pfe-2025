import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import robotAnimation from "../assets/robot.json";

import Footer from "../components/footer";
import LottieHeader from "../components/features/LottieHeader";
import CVUploadForm from "../components/features/CVUploadForm";
import CvDisplay from "../components/features/CvDisplay";

import { useResumeStore } from "../store/resume-store";
import { improveCvAndGeneratePdf } from "../api/cv-improve-api";

export default function CvImprovePage() {
  const [cvFile, setCvFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { setAllData } = useResumeStore();

  const mutation = useMutation({
    mutationFn: (file) => improveCvAndGeneratePdf(file),
    onSuccess: (data) => {
      const { improvedPdf, improvedJson } = data;

      // store structured improved data
      setAllData(improvedJson);

      // create preview URL
      const blobUrl = URL.createObjectURL(improvedPdf);
      setPdfUrl(blobUrl);
    },
    onError: (err) => {
      setErrorMessage("Something went wrong while improving your CV.");
      console.error(err);
    },
  });

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleImprove = () => {
    if (!cvFile) {
      alert("Please upload a CV file.");
      return;
    }

    setPdfUrl(null);
    setErrorMessage("");
    mutation.mutate(cvFile);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto py-12 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <LottieHeader
            animationData={robotAnimation}
            text="Uppload your CV and let me help you improve it!"
          />

          <CVUploadForm
            onFileChange={handleFileChange}
            onSubmit={handleImprove}
            buttonLabel="✨ Improve CV"
          />
        </div>

        {mutation.isPending && (
          <div className="text-center mt-6 text-gray-600 animate-pulse">
            Improving your CV...
          </div>
        )}

        {errorMessage && (
          <div className="text-red-600 text-center mt-6">{errorMessage}</div>
        )}

        {pdfUrl && (
          <CvDisplay
            title="📄 Improved CV"
            pdfSrc={pdfUrl}
            downloadName="Improved_CV.pdf"
            buttonColor="#00ddb3"
            textColor="#1b4977"
          />
        )}
      </main>
  
    </div>
  );
}
