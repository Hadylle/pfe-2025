// components/ProgressBarOverlay.jsx
import { useProgress } from './ProgressContext';

export default function ProgressBarOverlay() {
  const { visible, progress, label } = useProgress();

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] w-[90%] bg-white p-4 rounded shadow-lg">
      <div className="flex items-center gap-2 text-gray-800 font-medium mb-2">
        <svg className="animate-spin h-5 w-5 text-[#0c549f]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        {label} {progress}%
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0c549f] to-[#00ddb3] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
