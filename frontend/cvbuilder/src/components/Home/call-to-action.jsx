
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#3B82F6] via-[#6D28D9] to-[#8B5CF6] transition-all duration-700 ease-in-out">
      <div className="max-w-4xl mx-auto text-center py-24 px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[#F3F4F6] max-w-2xl mx-auto">
            Join thousands of job seekers landing interviews with our AI-powered resume builder.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-[#10B981] text-[#1F2937] text-lg font-semibold rounded-xl shadow-md hover:bg-[#0ea271] transition-all duration-200"
          >
            Get Started for Free
          </motion.button>

          <div className="mt-4 flex items-center justify-center text-sm text-[#E5E7EB]">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
            No credit card required
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;