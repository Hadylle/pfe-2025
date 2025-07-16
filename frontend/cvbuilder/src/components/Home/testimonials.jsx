import { useState } from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "The AI analysis helped me identify gaps in my CV I never would have noticed.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "The job matching feature is incredible. It showed me exactly which skills to highlight.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      name: "David Wilson",
      role: "Recent Graduate",
      content: "The AI builder helped me present my skills in the most professional way possible.",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 5
    },
    {
      name: "Emily Green",
      role: "HR Specialist",
      content: "User-friendly, modern and efficient. Love the templates!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5
    },
    {
      name: "Tom Hardy",
      role: "Freelancer",
      content: "The resume suggestions were really tailored to my niche industry.",
      avatar: "https://randomuser.me/api/portraits/men/90.jpg",
      rating: 4
    },
    {
      name: "Anna Bell",
      role: "UX Designer",
      content: "Simple yet powerful tool. Helped me redesign my whole career story.",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      rating: 5
    }
  ];

  const [page, setPage] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const currentTestimonials = testimonials.slice(
    page * testimonialsPerPage,
    page * testimonialsPerPage + testimonialsPerPage
  );

  return (
    <div className="w-full bg-[#F9FAFB] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#3B82F6] mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex flex-col items-center">
                <img src={t.avatar} className="w-20 h-20 rounded-full border-4 border-[#8B5CF6] mb-4" />
                <p className="text-[#1F2937] text-md italic mb-3">"{t.content}"</p>
                <div className="flex mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#fab23d]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l..."/>
                    </svg>
                  ))}
                </div>
                <h4 className="font-bold text-[#3B82F6]">{t.name}</h4>
                <p className="text-sm text-[#6B7280]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center space-x-3">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              className={`w-3 h-3 rounded-full ${page === idx ? 'bg-[#3B82F6]' : 'bg-[#D1D5DB]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;