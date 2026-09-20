import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects } from '../data/mockProjects';
import ProjectCard from './ProjectCard';

const TABS = [
  { id: 'ongoing', label: 'ONGOING' },
  { id: 'upcoming', label: 'UPCOMING' },
  { id: 'completed', label: 'COMPLETED' },
];

const ProjectsSection = () => {
  const [activeStatus, setActiveStatus] = useState('ongoing');

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(
      (project) => (project.statusCategory || '').toLowerCase() === activeStatus
    );
  }, [activeStatus]);

  return (
    <section
      id="projects"
      className="relative scroll-mt-28 md:scroll-mt-32 bg-[#f7f4ed] px-6 py-24 md:px-10 md:py-36 lg:px-14"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
            OUR PROJECTS
          </p>
          <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.8rem)] font-light leading-[0.92] tracking-[-0.05em] text-[#102c1c]">
            Explore our developments.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#5c6860] md:text-lg">
            Browse our ongoing, upcoming and completed projects.
          </p>
        </div>

        {/* Status Tabs: Prominently Placed */}
        <div className="mb-12 border-b border-[#102c1c]/15">
          <div
            role="tablist"
            aria-label="Project status filter"
            className="flex items-center gap-8 sm:gap-12 overflow-x-auto no-scrollbar"
          >
            {TABS.map((tab) => {
              const isActive = activeStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStatus(tab.id)}
                  className={`relative pb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] rounded-t-sm whitespace-nowrap ${
                    isActive
                      ? 'text-[#102c1c] font-bold'
                      : 'text-[#6e7a72]/60 hover:text-[#102c1c]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1d6b3e]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel Content */}
        <div
          id={`tabpanel-${activeStatus}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeStatus}`}
          className="min-h-[360px]"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeStatus}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            ) : (
              /* Empty State Message */
              <motion.div
                key={`empty-${activeStatus}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#102c1c]/20 bg-[#fffdf8] p-10 text-center text-[#102c1c]"
              >
                <p className="font-display text-xl font-light text-[#102c1c] sm:text-2xl">
                  No projects are currently listed in this category.
                </p>
                <p className="mt-2 text-sm text-[#5c6860]">
                  Please explore our ongoing or upcoming developments in the tabs above.
                </p>
                <button
                  onClick={() => setActiveStatus('ongoing')}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#102c1c] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1d6b3e] transition-colors"
                >
                  View Ongoing Projects
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
