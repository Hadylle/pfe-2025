import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { SectionLayout } from '../components/layout/SectionLayout';
import { PageLayout } from '../components/layout/PageLayout';

import { Textarea } from '../components/ui/Input';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import LottieHeader from '../components/features/LottieHeader';
import CVUploadForm from '../components/features/CVUploadForm';
import MatchResultDisplay from '../components/features/MatchResultDisplay';
import { matchCvToJob } from '../api/cv-match-api';
import { useProgress } from '../components/ProgressContext';

export default function CvMatchingPage() {
  const [cvFile, setCvFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [matchResult, setMatchResult] = useState(null);

  const { start, complete, error } = useProgress();

  const handleFileChange = (e) => setCvFile(e.target.files?.[0]);

  const handleMatchCheck = async () => {
    if (!cvFile || !jobText.trim()) {
      alert('Please upload your CV and paste the job description.');
      return;
    }

    start('Matching your CV to the job...');
    setErrorMessage('');
    setMatchResult(null);

    try {
      const result = await matchCvToJob(cvFile, jobText);
      setMatchResult(result);
      complete();
    } catch (err) {
      console.error('❌ Match error:', err);
      setErrorMessage('Something went wrong while checking your match.');
      error();
    }
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

  return (
    <PageLayout containerType="full">
      {!matchResult ? (
        <>
          <SectionLayout>
            <LottieHeader
              animationData={robotAnimation}
              text="Upload your CV and job offer to check if it's a good match."
            />

            <CVUploadForm
              onFileChange={handleFileChange}
              onSubmit={handleMatchCheck}
              buttonLabel="✅ Check Match"
              buttonColor="#ce0227"
              buttonHover="#a4001d"
            >
              {additionalFormContent}
            </CVUploadForm>
          </SectionLayout>

          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              onRetry={() => setErrorMessage('')}
              retryLabel="Clear Error"
            />
          )}
        </>
      ) : (
        <div className="mt-12 w-full">
          <MatchResultDisplay result={matchResult} />
        </div>
      )}
    </PageLayout>
  );
}
