
import { motion } from "framer-motion";

export default function CvDisplay({ title, pdfSrc, downloadName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200"
    >
      <h3 className="text-2xl font-bold text-[#0c549f] mb-4">{title}</h3>
      <div className="w-full h-[700px] border rounded overflow-hidden">
        <iframe src={pdfSrc} title="Improved CV" className="w-full h-full"></iframe>
      </div>
      <div className="mt-6 text-right">
        <a
          href={pdfSrc}
          download={downloadName}
          className="bg-[#0091e3] hover:bg-[#0c549f] text-white px-5 py-2 rounded-md shadow-md"
        >
          💾 Save as PDF
        </a>
      </div>
    </motion.div>
  );
}
