import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const faqs = [
  {
    question: "What makes CVAI different from other resume builders?",
    answer:
      "CVAI uses advanced AI to analyze, tailor, and optimize your CV based on real job descriptions and best practices.",
  },
  {
    question: "Can I create a CV from scratch on this platform?",
    answer:
      "Absolutely! Our guided builder helps you start from zero with smart suggestions along the way.",
  },
  {
    question: "How does the CV analysis feature work?",
    answer:
      "Upload your CV and get a structured breakdown with insights, strengths, and areas to improve — all AI-powered.",
  },
  {
    question: "What is CV Matching and how accurate is it?",
    answer:
      "CV Matching compares your CV to job postings and shows missing and common skills, giving you a percentage match.",
  },
  {
    question: "Will my data be stored securely?",
    answer:
      "Yes. Your CV data is encrypted and stored securely. You can access and manage it anytime in your dashboard.",
  },
  {
    question: "Can I download my CV as a PDF?",
    answer:
      "Yes. With one click, you can export your CV in a professionally styled, ATS-friendly PDF format.",
  },
  {
    question: "Do I need to be a designer or writer to use CVAI?",
    answer:
      "Not at all! The platform guides you with writing tips, formatting tools, and AI-powered assistance.",
  },
  {
    question: "Is this service free?",
    answer:
      "You can start for free. Some advanced features may require a subscription, which we clearly outline on our pricing page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Everything you need to know about using CVAI to build the perfect resume.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
              >
                <span>{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-gray-600 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
