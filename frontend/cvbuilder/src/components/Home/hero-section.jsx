import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // ✅ Must be inside the component

  const handleNavigation = () => {
    navigate("/build-resume"); // ✅ Navigates on button click
  };

  return (
    <div className="bg-gradient-to-r from-[#3B82F6] via-[#6D28D9] to-[#8B5CF6] text-white py-20 w-full mx-0 px-4">
      <div className="max-w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6 leading-tight">
            AI-Powered Resume Builder
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-[#F3F4F6]">
            Create a job-winning resume with our intelligent builder and professional templates approved by hiring managers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#10B981] text-white hover:bg-[#0ea271] px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all"
              onClick={handleNavigation}
            >
              Build My Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white hover:bg-[#3B82F6] px-8 py-4 rounded-lg font-bold text-lg transition-all"
            >
              Upload My Resume
            </motion.button>
          </div>
          <div className="flex items-center justify-center text-lg">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span>Trusted by 10,000+ job seekers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
