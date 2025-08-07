import { Button } from '../ui/Button';
import { cn } from '../../utils/className';

export default function StepNavigation({ currentStep, totalSteps, onPrevious, onNext }) {
  return (
    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </Button>

      <div className="flex space-x-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-colors duration-200',
              index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
            )}
          />
        ))}
      </div>

      <Button
        variant="primary"
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex items-center space-x-2"
      >
        <span>Next</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
}
