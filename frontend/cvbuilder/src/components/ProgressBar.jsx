export default function ProgressBar({ progress = 0, label = 'Loading...' }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[80%] z-[9999] bg-white p-4 rounded shadow-xl">
      <div className="flex items-center justify-center gap-2 mb-2 text-gray-700 font-medium">
        <svg
          className="animate-spin h-5 w-5 text-[#0c549f]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span>{label} {progress}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-sm">
        <div
          className="h-full bg-gradient-to-r from-[#0c549f] to-[#00ddb3] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
