import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { CvAnalysisLayout } from '../components/common/CvAnalysisLayout';
import { Textarea } from '../components/ui/Input';
import MatchResultDisplay from '../components/features/MatchResultDisplay';
import { matchCvToJob } from '../api/cv-match-api';
import EnhancedReviewBar from '../components/EnhancedReviewBar';

export default function CvMatchingPage() {
  const [jobText, setJobText] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [submittedRating, setSubmittedRating] = useState(false);

  const handleSuccess = (result) => {
    setMatchResult(result);
    setSubmittedRating(false);
  };

  const handleError = () => {
    alert('Something went wrong while checking your match.');
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

  const handleMatch = async (cvFile) => {
    if (!cvFile || !jobText.trim()) {
      throw new Error('CV or job description missing.');
    }
    return await matchCvToJob(cvFile, jobText);
  };

  return (
    <CvAnalysisLayout
      animationData={robotAnimation}
      headerText="Upload your CV and job offer to check if they match!"
      buttonLabel="Check Match"
      buttonEmoji="✅"
      apiFunction={handleMatch}
      onSuccess={handleSuccess}
      onError={handleError}
      additionalFormContent={additionalFormContent}
      resultComponent={
        matchResult
          ? () => (
              <>
                <MatchResultDisplay result={matchResult} />
                <EnhancedReviewBar
                  pageUrl="/cv-matching"
                  onSubmitted={handleRatingSubmit}
                  key="cv-matching-review"
                />
                {submittedRating && (
                  <p className="text-green-600 text-center mt-2">
                    Thank you for rating this match result!
                  </p>
                )}
              </>
            )
          : null
      }
    />
  );
}
