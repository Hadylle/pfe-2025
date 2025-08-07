import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { submitRating } from '../api/review-api';

const emojiMap = [
  { max: 20, emoji: "😞", color: "bg-red-500" },
  { max: 40, emoji: "😐", color: "bg-orange-400" },
  { max: 60, emoji: "🙂", color: "bg-yellow-400" },
  { max: 80, emoji: "😊", color: "bg-green-400" },
  { max: 100, emoji: "🤩", color: "bg-green-600" },
];

function getRatingData(value) {
  return emojiMap.find((item) => value <= item.max);
}

export default function EnhancedReviewBar({ pageUrl = window.location.pathname }) {
  const [rating, setRating] = useState(50);
  const ratingData = getRatingData(rating);
  const [submitted, setSubmitted] = useState(false);
  const barRef = useRef(null);
  const constraintsRef = useRef(null);

  const handleDrag = (event, info) => {
    if (!barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const width = rect.width;

    let newRating = Math.floor((x / width) * 100);
    newRating = Math.max(0, Math.min(100, newRating));
    setRating(newRating);
  };

  const handleDragEnd = () => {
    const snappedRating = Math.round(rating / 10) * 10;
    setRating(snappedRating);
  };

  const handleSubmit = async () => {
    try {
      await submitRating(rating, pageUrl);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const handleReport = () => {
    console.log("User clicked report for page:", pageUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-6 rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Let's Evaluate This Page</h2>

      <div className="flex items-center gap-4">
        {/* Evaluation Bar */}
        <div className="flex-1 relative" ref={constraintsRef}>
          <div
            ref={barRef}
            className="relative w-full h-16 rounded-full overflow-hidden border border-gray-300 bg-gray-100"
          >
            {/* Animated Fill */}
            <motion.div
              className={`absolute top-0 left-0 h-full ${ratingData.color} z-0`}
              animate={{ width: `${rating}%` }}
              transition={{ duration: 0.2 }}
            />

            {/* Draggable Handle */}
            <motion.div
              className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-10"
              style={{ x: `${rating}%` }}
            >
              <motion.span
                className="text-4xl select-none cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{ x: '-50%' }}
                dragPropagation={true}
              >
                {ratingData.emoji}
              </motion.span>
            </motion.div>
          </div>

          <p className="mt-2 text-center text-lg text-gray-700">
            Satisfaction Level: <span className="font-semibold">{rating}%</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 h-16 items-center">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform"
            title="Send Evaluation"
            disabled={submitted}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" fill="#0084FF"/>
            </svg>
          </button>
          <button
            onClick={handleReport}
            className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform"
            title="Report a Problem"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L1 21h22L12 2zm0 3.5L18.5 19h-13L12 5.5z" fill="#FF0000"/>
              <path d="M12 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-7a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill="#FF0000"/>
            </svg>
          </button>
        </div>
      </div>

      {submitted && (
        <p className="text-green-600 font-medium text-center mt-4">
          Thank you for your feedback! 🎉
        </p>
      )}
    </div>
  );
}