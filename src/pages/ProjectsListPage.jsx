import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mockProjects';

const STATUS_TABS = [
  { id: 'ongoing', label: 'ONGOING' },
  { id: 'upcoming', label: 'UPCOMING' },
  { id: 'completed', label: 'COMPLETED' },
];

const ProjectsListPage = () => {
  const [activeStatus, setActiveStatus] = useState('ongoing');

  useEffect(() => {
    document.title = 'Projects | Tulasi Foundation';
  }, []);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(
      (project) => (project.statusCategory || '').toLowerCase() === activeStatus
    );
  }, [activeStatus]);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#102c1c]">
      <Header />

      <main>
        {/* =====================================================
            PROJECTS PAGE HERO
            Lots of whitespace, architectural typography
        ====================================================== */}
        <section className="pt-36 pb-12 md:pt-44 md:pb-16 lg:pt-48 lg:pb-20 px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="max-w-3xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                OUR PROJECTS
              </p>
              <h1 className="font-display text-[clamp(3.2rem,7vw,7.5rem)] font-light leading-[0.9] tracking-[-0.055em] text-[#102c1c]">
                Explore our
                <span className="block">developments.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#5c6860] md:text-lg">
                Browse Tulasi Foundation's ongoing, upcoming and completed projects.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT CATALOGUE & CENTERED STATUS TABS
        ====================================================== */}
        <section className="pb-28 md:pb-36 lg:pb-44 px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            {/* Centered Status Tabs with generous gap */}
            <div className="mb-14 border-b border-[#102c1c]/15">
              <div className="flex justify-center overflow-x-auto no-scrollbar">
                <div
                  role="tablist"
                  aria-label="Project status filter"
                  className="flex items-center gap-10 md:gap-14 px-4"
                >
                  {STATUS_TABS.map((tab) => {
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
                            : 'text-[#758079]/70 hover:text-[#102c1c]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeStatusUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1d6b3e]"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tab Panel Content with Smooth AnimatePresence */}
            <div
              id={`tabpanel-${activeStatus}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeStatus}`}
              className="min-h-[420px]"
            >
              <AnimatePresence mode="wait">
                {filteredProjects.length > 0 ? (
                  <motion.div
                    key={activeStatus}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
                  >
                    {filteredProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  /* Centered Category Empty State */
                  <motion.div
                    key={`empty-${activeStatus}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex min-h-[320px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#102c1c]/20 bg-[#fffdf8] p-10 text-center text-[#102c1c]"
                  >
                    <p className="font-display text-2xl font-light text-[#102c1c] sm:text-3xl">
                      No projects are currently listed in this category.
                    </p>
                    <p className="mt-3 text-sm text-[#5c6860] max-w-md leading-6">
                      Please explore our ongoing or upcoming developments using the category tabs above.
                    </p>
                    <button
                      onClick={() => setActiveStatus('ongoing')}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#102c1c] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1d6b3e] transition-colors"
                    >
                      View Ongoing Projects
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsListPage;
