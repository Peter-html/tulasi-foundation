import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutTeaserSection from '../components/AboutTeaserSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

const INTRO_SESSION_KEY = 'tulasi-intro-seen';

const HomePage = () => {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.title = 'Tulasi Foundation';
  }, []);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // Continue normally if browser storage is unavailable.
    }
    setShowIntro(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <motion.div
        initial={showIntro ? { opacity: 0.7, scale: 1.008 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: showIntro ? 3.05 : 0 }}
      >
        <Header />

        <main>
          {/* 1. Hero Video */}
          <Hero playVideo={!showIntro} />

          {/* 2. Small About Teaser */}
          <AboutTeaserSection />

          {/* 3. Living / Services */}
          <ServicesSection />

          {/* 4. Featured Projects Teaser */}
          <FeaturedProjectsSection />

          {/* 5. Contact / Enquire */}
          <ContactSection />
        </main>

        <Footer />
      </motion.div>

      {/* Opening Animation Preloader */}
      <AnimatePresence mode="wait">
        {showIntro && <Preloader key="tulasi-intro" onFinish={finishIntro} />}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
