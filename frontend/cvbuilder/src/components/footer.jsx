import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const socialIcons = [
    {
      label: 'Twitter',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253..." />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10..." />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239..." />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#F3F4F6] text-[#1F2937]">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-[#3B82F6]">
              <FontAwesomeIcon icon={faBriefcase} className="w-8 h-8 mr-2" />
              HireMatch
            </h3>
            <p className="text-[#6B7280]">
              The AI-powered resume builder that helps you land more interviews.
            </p>
          </div>

          {[
            { title: 'Product', links: ['Templates', 'Examples', 'Pricing', 'Features'] },
            { title: 'Resources', links: ['Blog', 'Resume Tips', 'Cover Letters', 'Career Advice'] },
            { title: 'Company', links: ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'] },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-semibold mb-4 text-[#1F2937]">{section.title}</h4>
              <ul className="space-y-3 text-[#6B7280]">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-[#3B82F6] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-[#6B7280]">
              © {new Date().getFullYear()} HireMatch. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialIcons.map(({ label, icon }, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#6B7280] hover:text-[#3B82F6] transition-colors"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
