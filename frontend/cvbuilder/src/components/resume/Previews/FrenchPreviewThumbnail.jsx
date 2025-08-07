// BoldCVTemplate.tsx
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const FrenchPreviewThumbnail = () => {
  return (
    <div className="flex w-full h-screen font-sans text-black">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-black text-white flex flex-col items-center p-6">
        <div className="w-40 h-40 bg-yellow-400 mb-6 overflow-hidden">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">John Doe</h1>
        <h2 className="text-md text-yellow-400 mb-6">Full Stack Developer</h2>

        <div className="w-full text-sm">
          <p className="flex items-center mb-2">
            <Phone className="w-4 h-4 mr-2" /> +1 234 567 890
          </p>
          <p className="flex items-center mb-2">
            <Mail className="w-4 h-4 mr-2" /> john@example.com
          </p>
          <p className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2" /> New York, USA
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-yellow-400 font-bold mb-2">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>JavaScript</li>
            <li>React & Next.js</li>
            <li>Spring Boot</li>
            <li>MongoDB</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-10 bg-white overflow-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">About Me</h2>
          <p className="text-sm leading-relaxed">
            Passionate developer with 5+ years of experience building scalable web applications with modern technologies. Skilled in both frontend and backend, delivering strong user experiences and performant APIs.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Experience</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold">Senior Developer @ Google</h3>
              <p className="text-yellow-500">2022 - Present | Remote</p>
              <ul className="list-disc list-inside ml-4">
                <li>Led development of new product analytics dashboard using React and D3.</li>
                <li>Integrated backend with Spring Boot and MongoDB for fast querying.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Frontend Engineer @ Facebook</h3>
              <p className="text-yellow-500">2020 - 2022 | New York</p>
              <ul className="list-disc list-inside ml-4">
                <li>Improved performance by 25% using lazy loading and React.memo.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Education</h2>
          <p className="text-sm">
            <strong>MIT</strong> — BSc in Computer Science (2016 - 2020)
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Languages</h2>
          <ul className="list-inside list-disc text-sm ml-4">
            <li>English — Fluent</li>
            <li>French — Intermediate</li>
            <li>Arabic — Native</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default FrenchPreviewThumbnail;
