import { motion } from "framer-motion";

export default function MatchResultDisplay({ result }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-[#0c549f] mb-4">📊 Matching Result</h2>
      <p className="text-lg text-gray-800 mb-2">
        <strong>Match Score:</strong>{' '}
        <span className="text-3xl font-bold text-green-600 animate-pulse">{result.similarity}%</span>
      </p>
      <p className="text-gray-700"><strong>Common Skills:</strong> {result.commonSkills}</p>
      <p className="text-gray-700"><strong>Missing Skills:</strong> {result.missingSkills}</p>
<p className="mt-2 text-gray-700"><strong>Explanation:</strong> {result.scoreExplanation}</p>
      <p className="mt-2">
        <strong>Fit Decision:</strong>{' '}
        {result.jobFit === 'yes' ? (
          <span className="text-green-600 font-semibold">You're a strong match for this job! 🎯</span>
        ) : (
          <span className="text-red-500 font-semibold">Needs improvement to match the job better.</span>
        )}
      </p>
    </motion.div>
  );
}
