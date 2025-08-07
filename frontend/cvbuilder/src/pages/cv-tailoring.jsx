import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { CvAnalysisLayout } from '../components/common/CvAnalysisLayout';
import { tailorCv } from '../api/tailor-cv-api';
import { useResumeStore } from '../store/resume-store';
import { normalizeCvData } from '../utils/normalizeCvData';
import BuildResume from './build-resume';
import { useProgress } from '../components/ProgressContext';
import { Textarea } from '../components/ui/Input';
import EnhancedReviewBar from '../components/EnhancedReviewBar';

export default function CvTailoringPage() {
  const [jobText, setJobText] = useState('');
  const [resumeReady, setResumeReady] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(false);
  const { setAllData } = useResumeStore();
  const { start, complete, error } = useProgress();

  const handleTailor = async (cvFile) => {
    if (!cvFile || !jobText.trim()) {
      throw new Error('CV or job description missing.');
    }

    try {
      start('Tailoring your CV to match the job...');
      const tailoredJson = await tailorCv(cvFile, jobText);
      setAllData(normalizeCvData(tailoredJson));
      complete();
      setResumeReady(true);
      setSubmittedRating(false);
    } catch (err) {
      console.error('❌ Tailoring error:', err);
      error();
      throw new Error('Tailoring failed.');
    }
  };

  const handleError = () => {
    alert('Something went wrong while uploading or tailoring your CV.');
    error();
  };

  const handleRatingSubmit = () => {
    setSubmittedRating(true);
  };

  const additionalFormContent = (
    <Textarea
      label="Paste Job Description"
      placeholder="Enter job offer text here..."
      rows={5}
      value={jobText}
      onChange={(e) => setJobText(e.target.value)}
    />
  );

  return !resumeReady ? (
    <CvAnalysisLayout
      animationData={robotAnimation}
      headerText="Upload your CV and job offer to generate a tailored version for better matching."
      buttonLabel="🎯 Tailor My CV"
      buttonEmoji="🎯"
      apiFunction={handleTailor}
      onSuccess={() => {}}
      onError={handleError}
      additionalFormContent={additionalFormContent}
    />
  ) : (
    <div className="mt-12">
      <BuildResume mode="edit-after-tailor" />
      <div className="mt-10">
        <EnhancedReviewBar
          pageUrl="/cv-tailoring"
          onSubmitted={handleRatingSubmit}
          key="cv-tailoring-review"
        />
        {submittedRating && (
          <p className="text-green-600 text-center mt-2">
            Thank you for rating the tailoring result!
          </p>
        )}
      </div>
    </div>
  );
}
