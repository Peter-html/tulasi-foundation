import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { mockProjects } from '../data/mockProjects';

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-[#f7f4ed] px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">03 · Selected projects</p>
            <h2 className="font-display text-[clamp(3.4rem,7vw,7.8rem)] font-light leading-[0.87] text-[#102c1c]">A portfolio with room to breathe.</h2>
          </div>
          <Link to="/projects" className="mb-2 inline-flex items-center gap-3 text-sm font-semibold text-[#102c1c]">
            View all projects <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="space-y-5">
          {mockProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[62vh] overflow-hidden rounded-[30px] bg-[#102c1c] md:min-h-[76vh]"
            >
              <img src={project.coverImage} alt={project.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,17,.78)_0%,rgba(8,28,17,.28)_50%,rgba(8,28,17,.04)_80%),linear-gradient(0deg,rgba(8,28,17,.55)_0%,transparent_48%)]" />

              <div className="relative z-10 flex min-h-[62vh] flex-col justify-between p-6 text-white md:min-h-[76vh] md:p-10 lg:p-12">
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-white/25 bg-black/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">{project.status}</div>
                  <span className="font-display text-7xl font-light text-white/25 md:text-8xl">0{index + 1}</span>
                </div>

                <div className="grid gap-7 lg:grid-cols-[1fr_360px] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/60">{project.location} · {project.projectType}</p>
                    <h3 className="font-display text-[clamp(4rem,8vw,8.5rem)] font-light leading-[0.82] tracking-[-0.065em]">{project.name}</h3>
                  </div>
                  <div className="lg:pb-2">
                    <p className="text-sm leading-6 text-white/68">{project.shortDescription}</p>
                    <Link to={`/project/${project.id}`} className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102c1c] transition-transform group-hover:translate-x-1">
                      Explore project <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
