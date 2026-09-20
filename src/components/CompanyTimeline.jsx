import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const TIMELINE_DATA = [
  {
    year: '2022',
    project: 'Tulasi Foundations Inception',
    image: '/projects/limelight/limelight-1.webp',
    description:
      'Inception of our civil engineering and land development practice, pioneering transparent DTCP and RERA approved layouts along high-growth Tamil Nadu corridors.',
  },
  {
    year: '2023',
    project: 'Tulasi Green Meadows',
    image: '/projects/project-02/cover.webp',
    description:
      'Delivered our signature plotted masterplan with wide asphalt avenues, underground electrical systems, rainwater harvesting, and landscaped community parks.',
  },
  {
    year: '2024',
    project: 'Tulasi Limelight',
    image: '/photos/timeline-arch.jpg',
    description:
      'Marked an important chapter in Tulasi’s journey, delivering a thoughtfully planned plotted community in Tamil Nadu that combined natural surroundings, quality infrastructure, and enduring residential appeal.',
  },
  {
    year: '2025',
    project: 'Tulasi Enclave & Masterplanned Living',
    image: '/photos/project.png',
    description:
      'Expanded into luxury villa communities and architectural residences, combining sustainable passive cooling designs with scenic regional hillside views.',
  },
  {
    year: '2026',
    project: 'Next-Gen Smart Living & Pipeline',
    image: '/projects/project-03/cover.webp',
    description:
      'Entering a transformative chapter with 10 Lakhs+ sq.ft in pipeline, integrating smart digital customer platforms, clean energy infrastructure, and lasting appreciation.',
  },
];

const CompanyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Default to 2024 as shown in reference

  const activeItem = TIMELINE_DATA[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#121614] py-24 text-white sm:py-32 lg:py-36">
      {/* Background subtle glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#1d6b3e]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Section Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86efac]">
            OUR JOURNEY & MILESTONES
          </p>
          <h2 className="font-display mt-2 text-3xl font-light tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            A Legacy of Thoughtful Growth
          </h2>
        </motion.div>

        {/* Central Display Card (Photo + Description) */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#1a201c] shadow-[0_24px_70px_rgba(0,0,0,0.6)] border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.year}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Milestone Photo Banner */}
              <div className="relative h-60 sm:h-80 md:h-[420px] w-full overflow-hidden bg-black/60">
                <img
                  src={activeItem.image}
                  alt={activeItem.project}
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a201c] via-black/30 to-black/20" />
                <span className="absolute top-5 left-5 rounded-full bg-black/50 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-white/90 backdrop-blur-md border border-white/15">
                  Milestone · {activeItem.year}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-8 sm:p-12 text-center">
                <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                  {activeItem.year}
                </h3>
                <h4 className="mt-3 text-lg sm:text-xl font-semibold text-white/90 tracking-wide">
                  {activeItem.project}
                </h4>
                <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#9eaaa2]">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrow Controls */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Milestone"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#102c1c] shadow-lg transition-all hover:bg-[#86efac] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Milestone"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#102c1c] shadow-lg transition-all hover:bg-[#86efac] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac]"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Horizontal Interactive Timeline Scrubber with Connector Pin */}
        <div className="relative mt-14 sm:mt-20 pt-6">
          {/* Main Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/20" />

          {/* Interactive Milestone Nodes */}
          <div className="relative z-10 flex justify-between items-center max-w-3xl mx-auto px-4">
            {TIMELINE_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.year}
                  onClick={() => setActiveIndex(index)}
                  className="group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86efac] rounded-lg p-2"
                >
                  {/* Year Label */}
                  <span
                    className={`mb-3 text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'text-white scale-110 font-bold'
                        : 'text-white/40 group-hover:text-white/80'
                    }`}
                  >
                    {item.year}
                  </span>

                  {/* Dot Node */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-white ring-4 ring-[#86efac]/40 scale-125'
                          : 'bg-white/40 group-hover:bg-white group-hover:scale-110'
                      }`}
                    />

                    {/* Active Vertical Connector Pin Line (Matches reference screenshot 3!) */}
                    {isActive && (
                      <motion.div
                        layoutId="timelinePin"
                        className="absolute bottom-full mb-1 h-6 w-[2px] bg-white"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;
