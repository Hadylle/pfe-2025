import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import robotAnimation from '../assets/robot.json';

import Footer from '../components/footer';
import LottieHeader from '../components/features/LottieHeader';
import CVUploadForm from '../components/features/CVUploadForm';
import FeedbackSection from '../components/features/FeedbackSection';
import { getCvFeedback } from '../api/cv-feedback-api';
import { useProgress } from '../components/ProgressContext';

function parseFeedback(text) {
  // Regex to extract each section by label
  const regex = /✅ \*\*Strengths\*\*([\s\S]*?)⚠️ \*\*Areas for Improvement\*\*([\s\S]*?)🚫 \*\*Missing or Weak Sections\*\*([\s\S]*?)📊 \*\*Overall Impression\*\*([\s\S]*)/m;
  const match = regex.exec(text);

  if (!match) {
    return {
      strengths: [],
      improvements: [],
      missing: [],
      impression: text.trim(),
    };
  }

  // Helper to parse bullet points starting with '*'
  const parseBullets = (sectionText) =>
    sectionText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('*'))
      .map(line => line.replace(/^\*\s*/, '').trim());

  return {
    strengths: parseBullets(match[1]),
    improvements: parseBullets(match[2]),
    missing: parseBullets(match[3]),
    impression: match[4].trim(),
  };
}

export default function CvFeedbackPage() {
  const [cvFile, setCvFile] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const { start, complete, error } = useProgress();

  const mutation = useMutation({
    mutationFn: getCvFeedback,
    onMutate: () => {
      start('Analyzing your CV...');
      setFeedback(null);
    },
    onSuccess: (textFeedback) => {
      complete();
      const structured = parseFeedback(textFeedback);
      setFeedback(structured);
    },
    onError: () => {
      error();
      alert('Error analyzing your CV.');
    }
  });

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleReview = () => {
    if (!cvFile) {
      alert('Please upload a CV file.');
      return;
    }
    mutation.mutate(cvFile);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto py-12 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <LottieHeader
            animationData={robotAnimation}
            text="Uppload your CV for Expert Feedback"
          />

          <CVUploadForm
            onFileChange={handleFileChange}
            onSubmit={handleReview}
            buttonLabel="Generate Feedback"
          />
        </div>

        {feedback && <FeedbackSection feedback={feedback} />}

        {mutation.isError && (
          <div className="text-center mt-6 text-red-600">
            <p>Something went wrong. Please try again.</p>
            <button
              onClick={() => mutation.reset()}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
            >
              🔁 Retry
            </button>
          </div>
        )}
      </main>

    </div>
  );
}
