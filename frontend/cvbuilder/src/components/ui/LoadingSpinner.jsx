import { cn } from '../../utils/className';

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className={cn('animate-spin rounded-full border-b-2 border-blue-600', sizeClasses[size], className)}>
    </div>
  );
}