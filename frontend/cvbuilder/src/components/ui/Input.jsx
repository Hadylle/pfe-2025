import { styleUtils } from '../../utils/styleUtils';
import { cn } from '../../utils/className';

export function Input({ 
  label,
  error,
  helper,
  className = '',
  state = 'default',
  ...props 
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          styleUtils.getInputClasses(error ? 'error' : state),
          className
        )}
        {...props}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {helper && !error && <p className="text-gray-500 text-sm">{helper}</p>}
    </div>
  );
}

// components/ui/Textarea.jsx
import {  componentStyles } from '../../styles/components';

export function Textarea({ 
  label,
  error,
  helper,
  className = '',
  rows = 4,
  ...props 
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          componentStyles.form.textarea,
          error && 'border-red-300 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {helper && !error && <p className="text-gray-500 text-sm">{helper}</p>}
    </div>
  );
}
