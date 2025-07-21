import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import robotAnimation from "../assets/robot.json";

import Footer from "../components/footer";
import LottieHeader from "../components/features/LottieHeader";
import CVUploadForm from "../components/features/CVUploadForm";
import CvDisplay from "../components/features/CvDisplay";
import BuildResume from "./build-resume";

import { useResumeStore } from "../store/resume-store";
import { improveCvAndGeneratePdf } from "../api/cv-improve-api";
import { useProgress } from "../components/ProgressContext";

export default function CvImprovePage() {
  const [cvFile, setCvFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeGenerated, setResumeGenerated] = useState(false);

  const { setAllData } = useResumeStore();
  const { start, complete, error } = useProgress();

  const mutation = useMutation({
    mutationFn: (file) => improveCvAndGeneratePdf(file),
    onMutate: () => {
      start("Improving your CV...");
      setErrorMessage("");
    },
    onSuccess: (data) => {
      const { improvedPdf, improvedJson } = data;
      setAllData(improvedJson);
      const blobUrl = URL.createObjectURL(improvedPdf);
      setPdfUrl(blobUrl);
      complete();
      setResumeGenerated(true);
    },
    onError: (err) => {
      console.error(err);
      error();
      setErrorMessage("Something went wrong while improving your CV.");
    },
  });

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleImprove = () => {
    if (!cvFile) {
      alert("Please upload a CV file.");
      return;
    }
    setPdfUrl(null);
    mutation.mutate(cvFile);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full max-w-full py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
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

       

        {resumeGenerated && (
          <div className="mt-12">
            <BuildResume mode="edit-after-improve" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
