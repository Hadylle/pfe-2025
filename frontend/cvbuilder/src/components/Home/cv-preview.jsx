import { motion } from "framer-motion";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

const CVPreview = () => {
  const features = [
    {
      title: "Comprehensive CV Analysis",
      description:
        "Unlock deep insights into your CV structure and content with AI-powered analysis. Receive a structured JSON output highlighting strengths and areas to improve.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      actionText: "Analyze My CV",
      reverse: false,
    },
    {
      title: "Smart CV Matching",
      description:
        "Instantly see how well your skills match job requirements. Discover missing and common skills to tailor your CV for maximum impact.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      actionText: "Match to Jobs",
      reverse: true,
    },
    {
      title: "Expert CV Feedback & Improvement",
      description:
        "Get professional, AI-generated feedback to polish your CV. Enhance content clarity, structure, and keyword optimization effortlessly.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      actionText: "Get Feedback",
      reverse: false,
    },
    {
      title: "Tailor Your CV to Job Descriptions",
      description:
        "Automatically customize your CV based on specific job descriptions. Boost your chances by highlighting the right skills and experience.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      actionText: "Tailor CV",
      reverse: true,
    },
    {
      title: "Professional PDF Generation",
      description:
        "Download beautifully styled, ATS-friendly PDFs with one click. Perfect formatting across devices and print-ready for your job applications.",
      image:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80",
      actionText: "Export PDF",
      reverse: false,
    },
    {
      title: "Secure CV Storage",
      description:
        "Keep all your structured CV data safely stored and accessible anytime. Manage versions and track improvements with ease.",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
      actionText: "Manage Storage",
      reverse: true,
    },
    {
      title: "Powered by Cutting-Edge AI",
      description:
        "Experience next-level resume building with our OllamaChatModel. Intelligent, adaptive, and ready to help you craft the perfect CV.",
      image:
        "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=600&q=80",
      actionText: "Explore AI Power",
      reverse: false,
    },
    {
      title: "Build Your CV from Scratch",
      description:
        "Start fresh with our guided CV builder. Easily create a professional resume step-by-step, with AI assistance to highlight your strengths.",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
      actionText: "Start Building",
      reverse: true,
    },
  ];

 
  return (
    <div className="w-full bg-[#F9FAFB] py-16">
      <div className="max-w-full mx-auto px-2"> {/* Changed max-w and padding */}
        <div className="text-center mb-14 px-4"> {/* Add some horizontal padding */}
          <h2 className="text-[#7C3AED] font-semibold uppercase tracking-widest text-sm">
            Advanced CV Solutions
          </h2>
          <h3 className="text-4xl font-extrabold text-[#111827] mt-2">
            Transform Your Resume with AI-Powered Features
          </h3>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
            Leverage cutting-edge technology to analyze, tailor, and enhance your CV to land your dream job.
          </p>
        </div>

        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center mb-20 gap-8 px-4`} // Added px-4 here for side spacing per row
          >
            {/* Image */}
            <div className="lg:w-1/2 w-full px-4">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="rounded-2xl shadow-xl overflow-hidden border-2 border-[#7C3AED]"
                style={{ minHeight: "320px", maxHeight: "400px" }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "0.5rem" }}
                />
              </motion.div>
            </div>

            {/* Text & Button */}
            <div className="lg:w-1/2 w-full px-6">
              <motion.h3
                whileHover={{ x: 8 }}
                className="text-3xl font-bold text-[#111827] mb-4"
              >
                {feature.title}
              </motion.h3>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Button with conditional arrow direction */}
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: "rgba(124, 58, 237, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#7C3AED]/20 text-[#7C3AED] font-semibold shadow-md hover:bg-[#7C3AED]/30 transition-colors"
                onClick={() => alert(`Navigate to ${feature.actionText}`)}
              >
                {feature.reverse ? (
                  <>
                    <ChevronLeftIcon className="w-5 h-5" />
                    <span>{feature.actionText}</span>
                  </>
                ) : (
                  <>
                    <span>{feature.actionText}</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CVPreview;