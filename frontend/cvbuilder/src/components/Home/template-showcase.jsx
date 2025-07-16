import { motion } from 'framer-motion';

const TemplatesSection = () => {
  const templates = [
    { id: 1, name: 'Professional', category: 'ATS Friendly', popular: true },
    { id: 2, name: 'Modern', category: 'Creative' },
    { id: 3, name: 'Executive', category: 'Corporate' },
    { id: 4, name: 'Minimalist', category: 'Clean Design' }
  ];

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-[#3B82F6] uppercase tracking-wide">Templates</h2>
          <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            Professional Resume Templates
          </h3>
          <p className="mt-4 text-lg text-[#6B7280] max-w-3xl mx-auto">
            Choose from recruiter-approved templates that pass applicant tracking systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white border border-[#E5E7EB] rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="bg-[#E5E7EB] h-60 flex items-center justify-center relative">
                {template.popular && (
                  <div className="absolute top-4 right-4 bg-[#10B981] text-[#ffff] text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <span className="text-[#4B5563]">Template Preview</span>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg text-[#111827]">{template.name}</h4>
                <p className="text-[#6B7280] text-sm mb-4">{template.category}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Use This Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-12 text-center"
        >
          <button className="text-[#3B82F6] font-semibold hover:underline transition-colors flex items-center justify-center mx-auto">
            View All 12+ Templates
            <svg className="w-5 h-5 ml-2 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesSection;
