import { Button } from './Button';
import { cn } from '../../utils/className';
export function ErrorMessage({ 
  message, 
  onRetry, 
  retryLabel = '🔁 Retry',
  className = '' 
}) {
  return (
    <div className={cn('text-center mt-6 text-red-600', className)}>
      <p>{message}</p>
      {onRetry && (
        <Button
          variant="danger"
          onClick={onRetry}
          className="mt-4"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
