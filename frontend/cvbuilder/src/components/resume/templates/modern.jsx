// components/resume/templates/Classic.js
export default function ModernTemplate({ data }) {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
        {data.role && <h2 className="text-xl text-gray-600">{data.role}</h2>}
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
          {data.email && <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {data.email}
          </div>}
          
          {data.phone && <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            {data.phone}
          </div>}
          
          {data.linkedin && <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            {data.linkedin.replace('https://', '')}
          </div>}
        </div>
      </header>
      
      {/* About Me */}
      {data.aboutMe && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">About Me</h2>
          <p className="text-gray-700">{data.aboutMe}</p>
        </section>
      )}
      
      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.role}</h3>
                <span className="text-gray-600">{exp.duration}</span>
              </div>
              <h4 className="text-gray-700">{exp.company}</h4>
              
              {exp.achievements?.length > 0 && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {exp.achievements.map((ach, j) => (
                    <li key={j} className="text-gray-700">{ach}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Add other sections similarly */}
    </div>
  );
}