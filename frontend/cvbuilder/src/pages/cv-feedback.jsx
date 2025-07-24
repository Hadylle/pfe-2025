import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { CvAnalysisLayout } from '../components/common/CvAnalysisLayout';
import FeedbackSection from '../components/features/FeedbackSection';
import { getCvFeedback } from '../api/cv-feedback-api';

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

  const handleSuccess = (textFeedback) => {
    const structured = parseFeedback(textFeedback);
    setFeedback(structured);
  };

  const handleError = () => {
    alert('Error analyzing your CV.');
  };

  return (
    <CvAnalysisLayout
      animationData={robotAnimation}
      headerText="Upload your CV for Expert Feedback"
      buttonLabel="Generate Feedback"
      buttonEmoji="📊"
      apiFunction={getCvFeedback}
      onSuccess={handleSuccess}
      onError={handleError}
      resultComponent={feedback ? () => <FeedbackSection feedback={feedback} /> : null}
    />
  );
}