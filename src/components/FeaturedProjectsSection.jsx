import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { mockProjects } from '../data/mockProjects';
import ProjectCard from './ProjectCard';

const FeaturedProjectsSection = () => {
  // Show maximum 2 projects on the homepage teaser
  const featured = mockProjects.slice(0, 2);

  return (
    <section
      id="projects"
      className="scroll-mt-28 md:scroll-mt-32 bg-[#f7f4ed] px-6 py-20 md:px-10 md:py-28 lg:px-14"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Teaser Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#102c1c]/15 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
              FEATURED PROJECTS
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5.2vw,5rem)] font-light leading-[0.92] tracking-[-0.05em] text-[#102c1c]">
              Selected developments.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5c6860]">
            Explore highlights from our residential portfolio, then view our complete catalogue of ongoing and upcoming projects.
          </p>
        </div>

        {/* 2 Featured Projects Grid (No status tabs on homepage) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-14 flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 rounded-full bg-[#102c1c] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#1d6b3e] shadow-[0_8px_24px_rgba(16,44,28,0.08)]"
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#102c1c]">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
