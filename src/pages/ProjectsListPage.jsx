import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, Compass, Layers } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mockProjects';

const TABS = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'ongoing', label: 'Ongoing', icon: Clock },
  { id: 'upcoming', label: 'Upcoming', icon: Compass },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
];

const ProjectsListPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = 'Projects | Tulasi Foundation';
  }, []);

  // Count items per category
  const counts = useMemo(() => {
    return {
      all: mockProjects.length,
      ongoing: mockProjects.filter((p) => ((p.category || p.statusCategory) || '').toLowerCase() === 'ongoing').length,
      upcoming: mockProjects.filter((p) => ((p.category || p.statusCategory) || '').toLowerCase() === 'upcoming').length,
      completed: mockProjects.filter((p) => ((p.category || p.statusCategory) || '').toLowerCase() === 'completed').length,
    };
  }, []);

  // Filter projects by active tab
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return mockProjects;
    return mockProjects.filter(
      (project) => ((project.category || project.statusCategory) || '').toLowerCase() === activeTab
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#102c1c]">
      <Header />

      <main>
        {/* =========================================================
            HERO SECTION: Tulasi Projects with photo & seamless fade
            ========================================================= */}
        <section className="relative min-h-[75vh] overflow-hidden bg-[#102c1c] px-6 pb-20 pt-36 text-white md:min-h-[82vh] md:px-10 md:pb-28 md:pt-44 lg:px-14">
          {/* Panoramic Hero Background Photo */}
          <motion.div
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src="/photos/project.png"
              alt="Tulasi Project Landscape"
              className="h-full w-full object-cover object-center"
            />
            {/* Multi-layered atmospheric gradient connecting photo sunrise with Tulasi colors */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,44,28,0.4)_0%,rgba(16,44,28,0.22)_40%,rgba(16,44,28,0.5)_70%,rgba(247,244,237,0.95)_100%),linear-gradient(90deg,rgba(16,44,28,0.72)_0%,rgba(16,44,28,0.32)_50%,rgba(224,155,62,0.18)_100%)]" />
          </motion.div>

          {/* Smooth bottom dissolve: blends photo directly into #f7f4ed with no sharp edges */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-b from-transparent via-[#f7f4ed]/50 to-[#f7f4ed]" />

          <div className="relative z-20 mx-auto flex min-h-[50vh] max-w-[1500px] flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl pb-6"
            >
              {/* Title with graceful fade animation & harmonized brand palette */}
              <h1 className="font-display text-[clamp(4.5rem,11.5vw,11.5rem)] font-light leading-[0.84] tracking-[-0.065em] text-[#fffdf8]">
                Tulasi{' '}
                <span className="bg-gradient-to-r from-[#c4e3ca] via-[#86efac] to-[#fde047] bg-clip-text text-transparent">
                  Projects.
                </span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            PROJECT DIRECTORY: 3 Options (Ongoing, Upcoming, Completed)
            ========================================================= */}
        <section id="project-directory" className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            {/* Header & Filter Controls */}
            <div className="mb-12 flex flex-col justify-between gap-8 border-b border-[#102c1c]/15 pb-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1d6b3e]">
                  Portfolio Directory
                </p>
                <h2 className="font-display mt-2 text-4xl font-light tracking-[-0.05em] text-[#102c1c] md:text-5xl lg:text-6xl">
                  Explore by project stage.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#6c786f]">
                  Navigate through our live constructions, upcoming concepts, and completed communities.
                  Hover over any project image to stream aerial footage.
                </p>
              </div>

              {/* Filter Tabs: Ongoing, Upcoming, Completed (+ All) */}
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#102c1c]/10 bg-white/70 p-1.5 shadow-sm backdrop-blur-md">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const count = counts[tab.id];

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-[#102c1c]/70 hover:text-[#102c1c]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeFilterPill"
                          className="absolute inset-0 rounded-full bg-[#102c1c] shadow-md"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={14} className={isActive ? 'text-[#86efac]' : 'text-[#102c1c]/50'} />
                        <span>{tab.label}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#102c1c]/5 text-[#102c1c]/60'
                          }`}
                        >
                          {count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Cards Grid with Fade & Stagger Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {filteredProjects.length === 0 ? (
                  <div className="rounded-[28px] border border-[#102c1c]/10 bg-white p-16 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#738078]">No projects found</p>
                    <h3 className="font-display mt-2 text-2xl font-light text-[#102c1c]">
                      No projects currently listed in this category.
                    </h3>
                    <button
                      onClick={() => setActiveTab('all')}
                      className="mt-6 rounded-full bg-[#102c1c] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1d6b3e]"
                    >
                      View all projects
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-7 lg:grid-cols-2">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <ProjectCard project={project} index={index} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsListPage;
