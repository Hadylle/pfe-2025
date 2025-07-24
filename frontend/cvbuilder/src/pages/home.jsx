import React from 'react';
import Navbar from '../components/UserNavbar';
import HeroSection from '../components/Home/hero-section';
import TemplatesSection from '../components/Home/template-showcase';
import CVPreview from '../components/Home/cv-preview';
import CallToAction from '../components/Home/call-to-action';
import FeaturesSection from '../components/Home/features-section';
import Testimonials from '../components/Home/testimonials';
import FAQ from '../components/Home/faq';

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
       
      <HeroSection />
      <TemplatesSection />
      <CVPreview />
      <FeaturesSection />
       <Testimonials />
      <CallToAction />
     <FAQ />
   
    </div>
  );
};

export default Home;
