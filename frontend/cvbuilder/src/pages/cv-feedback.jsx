import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { CvAnalysisLayout } from '../components/common/CvAnalysisLayout';
import FeedbackSection from '../components/features/FeedbackSection';
import { getCvFeedback } from '../api/cv-feedback-api';
import EnhancedReviewBar from '../components/EnhancedReviewBar';

function parseFeedback(text) {
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
  const [feedback, setFeedback] = useState(null);
  const [submittedRating, setSubmittedRating] = useState(false);

  const handleSuccess = (textFeedback) => {
    const structured = parseFeedback(textFeedback);
    setFeedback(structured);
    setSubmittedRating(false); // Reset rating submission when new feedback is generated
  };

  const handleError = () => {
    alert('Error analyzing your CV.');
  };

  const handleRatingSubmit = () => {
    setSubmittedRating(true);
  };

  return (
    <CvAnalysisLayout
      animationData={robotAnimation}
      headerText="Upload your CV here so I can provide you with an Expert Feedback"
      buttonLabel="Generate Feedback"
      buttonEmoji="📊"
      apiFunction={getCvFeedback}
      onSuccess={handleSuccess}
      onError={handleError}
      resultComponent={feedback ? () => (
        <>
          <FeedbackSection feedback={feedback} />
          <EnhancedReviewBar 
            pageUrl="/cv-feedback" 
            onSubmitted={handleRatingSubmit}
            key={feedback.impression} // Reset component when new feedback comes
          />
          {submittedRating && (
            <p className="text-green-600 text-center mt-2">
              Thank you for rating this feedback!
            </p>
          )}
        </>
      ) : null}
    />
  );
}