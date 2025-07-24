import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { CvAnalysisLayout } from '../components/common/CvAnalysisLayout';
import { Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import MatchResultDisplay from '../components/features/MatchResultDisplay';
import ConfettiBlast from '../components/ConfettiBlast';
import { matchCvToJob } from '../api/cv-match-api';

export default function CvMatchingPage() {
  const [cvFile, setCvFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleApiCall = () => {
    if (!cvFile || !jobText) {
      alert('Please upload a CV file and enter a job description.');
      return Promise.reject(new Error('Missing required fields'));
    }
    return matchCvToJob(cvFile, jobText);
  };

  const handleSuccess = (result) => {
    setMatchResult(result);
    setTimeout(() => setShowConfetti(true), 400);
  };

  const additionalFormContent = (
    <div className="space-y-4">
      <Textarea
        label="Paste Job Description"
        placeholder="Enter job offer text here..."
        rows={5}
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />
      
      <Button
        variant="danger"
        onClick={() => (window.location.href = '/match-booster')}
        className="w-full"
      >
        ✨ Boost Match
      </Button>
    </div>
  );

  return (
    <>
      <CvAnalysisLayout
        animationData={robotAnimation}
        headerText="Hello! Drop your CV and job offer below, and I'll check if it's a good match for you."
        buttonLabel="✅ Check Match"
        apiFunction={handleApiCall}
        onSuccess={handleSuccess}
        additionalFormContent={additionalFormContent}
        resultComponent={matchResult ? () => <MatchResultDisplay result={matchResult} /> : null}
      />
      {showConfetti && <ConfettiBlast />}
    </>
  );
}