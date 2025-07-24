import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PageLayout } from '../layout/PageLayout';
import { SectionLayout } from '../layout/SectionLayout';

import { ErrorMessage } from '../ui/ErrorMessage';
import LottieHeader from '../features/LottieHeader';
import CVUploadForm from '../features/CVUploadForm';
import { useProgress } from '../ProgressContext';

export function CvAnalysisLayout({
  animationData,
  headerText,
  buttonLabel,
  buttonEmoji = '',
  buttonColor,
  buttonHover,
  apiFunction,
  onSuccess,
  onError,
  additionalFormContent,
  resultComponent: ResultComponent,
  showFooter = true,
  containerType = 'content',
  children
}) {
  const [cvFile, setCvFile] = useState(null);
  const { start, complete, error } = useProgress();

  const mutation = useMutation({
    mutationFn: apiFunction,
    onMutate: () => {
      start(buttonLabel.replace(/[^\w\s]/gi, '') + '...');
    },
    onSuccess: (data) => {
      complete();
      onSuccess?.(data);
    },
    onError: (err) => {
      error();
      onError?.(err);
    }
  });

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleSubmit = () => {
    if (!cvFile) {
      alert('Please upload a CV file.');
      return;
    }
    mutation.mutate(cvFile);
  };

  return (
    <PageLayout showFooter={showFooter} containerType={containerType}>
      <SectionLayout>
        <LottieHeader
          animationData={animationData}
          text={headerText}
        />

        <CVUploadForm
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          buttonLabel={buttonLabel}
          buttonColor={buttonColor}
          buttonHover={buttonHover}
          loading={mutation.isPending}
        >
          {additionalFormContent}
        </CVUploadForm>
      </SectionLayout>

      {mutation.isError && (
        <ErrorMessage
          message={mutation.error?.message || 'Something went wrong. Please try again.'}
          onRetry={() => mutation.reset()}
        />
      )}

      {mutation.isSuccess && ResultComponent && (
        <ResultComponent result={mutation.data} />
      )}

      {children}
    </PageLayout>
  );
}
