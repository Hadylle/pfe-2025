import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { CvAnalysisLayout } from '../components/common/CvAnalysisLayout';
import { improveCvAndGeneratePdf } from '../api/cv-improve-api';
import { useResumeStore } from '../store/resume-store';
import { normalizeCvData } from '../utils/normalizeCvData';
import BuildResume from './build-resume';
import { useProgress } from '../components/ProgressContext';
import EnhancedReviewBar from '../components/EnhancedReviewBar';

export default function CvImprovePage() {
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(false);
  const { setAllData } = useResumeStore();
  const { start, complete, error } = useProgress();

  const handleSuccess = (data) => {
    const { improvedPdf, improvedJson } = data;
    setAllData(normalizeCvData(improvedJson));
    complete();
    setResumeGenerated(true);
    setSubmittedRating(false);
  };

  const handleError = () => {
    alert('Something went wrong while improving your CV.');
    error();
  };

  const handleRatingSubmit = () => {
    setSubmittedRating(true);
  };

  return !resumeGenerated ? (
    <CvAnalysisLayout
      animationData={robotAnimation}
      headerText="Upload your CV Here and let me help you correct it and improve it if needed!"
      buttonLabel="✨ Improve CV"
      buttonEmoji="✨"
      apiFunction={improveCvAndGeneratePdf}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  ) : (
    <div className="mt-12">
      <BuildResume mode="edit-after-improve" />
      <div className="mt-10">
        <EnhancedReviewBar
          pageUrl="/cv-improve"
          onSubmitted={handleRatingSubmit}
          key="cv-improve-review"
        />
        {submittedRating && (
          <p className="text-green-600 text-center mt-2">
            Thank you for rating the improvement!
          </p>
        )}
      </div>
    </div>
  );
}
