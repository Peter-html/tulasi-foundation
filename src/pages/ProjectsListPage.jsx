import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mockProjects';

const ProjectsListPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <Header />
      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-[#102c1c] px-6 pb-12 pt-36 text-white md:px-10 md:pb-16 md:pt-44 lg:px-14">
          <img src="/projects/limelight/limelight-7.webp" alt="Tulasi project landscape" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,31,18,.82),rgba(8,31,18,.18)),linear-gradient(0deg,rgba(8,31,18,.55),transparent)]" />
          <div className="relative mx-auto flex min-h-[50vh] max-w-[1500px] flex-col justify-end">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c4e3ca]">Projects · 01—04</p>
            <h1 className="font-display max-w-6xl text-[clamp(4.5rem,11vw,11rem)] font-light leading-[0.82] tracking-[-0.065em]">Choose the place that fits the life ahead.</h1>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/20 pt-5 text-xs uppercase tracking-[0.16em] text-white/60">
              <span>Plots</span><span>Villas</span><span>Apartments</span><span>Tamil Nadu</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#102c1c]/15 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1d6b3e]">Selected portfolio</p>
                <h2 className="font-display mt-2 text-4xl font-light tracking-[-0.05em] md:text-5xl">Four projects. One clear experience.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#6c786f]">Move your cursor over a project image to preview its site footage. Open the project for the full story, gallery and details.</p>
            </div>

            <div className="grid gap-7 lg:grid-cols-2">
              {mockProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsListPage;
