import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import robotAnimation from '../assets/robot.json';

import Navbar from '../components/UserNavbar';
import Footer from '../components/footer';

import LottieHeader from '../components/features/LottieHeader';
import CVUploadForm from '../components/features/CVUploadForm';
import MatchResultDisplay from '../components/features/MatchResultDisplay';
import ConfettiBlast from '../components/ConfettiBlast';

import { matchCvToJob } from '../api/cv-match-api';
import { useProgress } from '../components/ProgressContext';

export default function CvMatchingPage() {
  const [cvFile, setCvFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const { start, complete, error } = useProgress();

  const mutation = useMutation({
    mutationFn: ({ cvFile, jobText }) => matchCvToJob(cvFile, jobText),
    onMutate: () => {
      start('Matching your CV...');
      setShowConfetti(false);
    },
    onSuccess: () => {
      complete();
      setTimeout(() => setShowConfetti(true), 400);
    },
    onError: () => {
      error();
    }
  });

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleCheckMatch = () => {
    if (!cvFile || !jobText) {
      alert('Please upload a CV file and enter a job description.');
      return;
    }
    mutation.mutate({ cvFile, jobText });
  };

  const handleRetry = () => {
    mutation.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff]">
      <main className="flex-1 max-w-6xl mx-auto py-12 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <LottieHeader
            animationData={robotAnimation}
            text="Heello! Drop your CV and job offer below, and I’ll check if it’s a good match for you."
          />

          <CVUploadForm
            onFileChange={handleFileChange}
            onSubmit={handleCheckMatch}
            buttonLabel="✅ Check Match"
          >
            <div>
              <label className="block font-medium mb-2 text-gray-700">Paste Job Description</label>
              <textarea
                rows={5}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Enter job offer text here..."
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-[#00ddb3]"
              />
            </div>

            <button
              onClick={() => (window.location.href = '/match-booster')}
              className="bg-[#ce0227] hover:bg-red-700 text-white px-5 py-2 rounded-md shadow-sm mt-4"
              type="button"
            >
              ✨ Boost Match
            </button>
          </CVUploadForm>
        </div>

        {mutation.isError && (
          <div className="text-center mt-6 text-red-600">
            <p>Error checking match: {mutation.error.message}</p>
            <button
              onClick={handleRetry}
              className="mt-4 bg-[#0c549f] hover:bg-[#08366c] text-white px-4 py-2 rounded-md shadow"
            >
              🔁 Retry
            </button>
          </div>
        )}

        {mutation.isSuccess && (
          <>
            {showConfetti && <ConfettiBlast />}
            <MatchResultDisplay result={mutation.data} />
          </>
        )}
      </main>

    </div>
  );
}
