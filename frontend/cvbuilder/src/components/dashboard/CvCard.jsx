import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CvCard = ({ cv }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  // Update height on toggle
  useEffect(() => {
    if (isExpanded) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{cv.name || 'Untitled CV'}</h3>
          <p className="text-gray-500 text-sm mt-1">
            Created on {new Date(cv.createdAt).toLocaleDateString()}
          </p>
        </div>
        <a
          href={`/api/cv/download/${cv.id}`}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          download
        >
          Download
        </a>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="text-gray-400">Email</p>
          <p>{cv.email}</p>
        </div>
        <div>
          <p className="text-gray-400">Phone</p>
          <p>{cv.phone}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-4">
        <button
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
        >
          Skills {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <div
          ref={contentRef}
          style={{ maxHeight: height }}
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out opacity-100"
        >
          <div className="flex flex-wrap gap-2 mt-2">
            {cv.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvCard;
