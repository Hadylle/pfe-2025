import { motion } from "framer-motion";
import { useTypewriter } from "./UseTypeWriter"; 

export default function FeedbackSection({ feedback }) {
  // Animate Overall Impression text with typewriter effect
  const displayedImpression = useTypewriter(feedback.impression);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200 space-y-8"
    >
      {/* Other sections (strengths, improvements, missing) unchanged */}
      {["strengths", "improvements", "missing"].map((key, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
        >
          <h3 className="text-2xl font-semibold text-[#0c549f] mb-4 capitalize">
            {key === "improvements"
              ? "Areas for Improvement"
              : key.replace(/^\w/, (c) => c.toUpperCase())}
          </h3>
          <ul className="list-disc ml-6 text-gray-800 space-y-2">
            {feedback[key].length === 0 ? (
              <li className="italic text-gray-500">No feedback available.</li>
            ) : (
              feedback[key].map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>
        </motion.div>
      ))}

      {/* Overall Impression with typewriter effect */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-2xl font-semibold text-[#0c549f] mb-4">
          Overall Impression
        </h3>
        <p className="text-gray-800 whitespace-pre-line font-mono">
          {displayedImpression}
          <span className="animate-pulse">|</span>
        </p>
      </motion.div>

      <div className="pt-6 text-right">
        <button
          onClick={() => (window.location.href = "/cv-improve")}
          className="bg-[#ce0227] hover:bg-[#a8011e] text-white px-6 py-2 rounded-md shadow-md transition duration-200"
        >
          🚀 Improve This CV
        </button>
      </div>
    </motion.div>
  );
}
