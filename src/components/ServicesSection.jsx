import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { no: '01', title: 'Plots', copy: 'Clear layouts, real aerial context and information designed to make site selection simpler.' },
  { no: '02', title: 'Villas', copy: 'Architectural living with space for exterior showcases, galleries and future interactive 3D experiences.' },
  { no: '03', title: 'Apartments', copy: 'Project stories that connect architecture, neighbourhood and everyday convenience in one flow.' },
];

const ServicesSection = () => {
  return (
    <section id="living" className="bg-[#102c1c] px-6 py-24 text-white md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a9d4b5]">02 · What we create</p>
            <h2 className="font-display max-w-4xl text-[clamp(3rem,6vw,6.2rem)] font-light leading-[0.9] tracking-[-0.055em]">
              Three ways to find your place.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/55">A quieter, more editorial presentation inspired by contemporary architecture and destination websites.</p>
        </div>

        <div className="divide-y divide-white/15">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group grid gap-5 py-8 md:grid-cols-[80px_1fr_1fr_55px] md:items-center md:py-10"
            >
              <span className="text-xs tracking-[0.2em] text-white/35">{item.no}</span>
              <h3 className="font-display text-5xl font-light tracking-[-0.05em] md:text-6xl">{item.title}</h3>
              <p className="max-w-xl text-sm leading-6 text-white/55 md:text-base">{item.copy}</p>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#a9d4b5] group-hover:bg-[#a9d4b5] group-hover:text-[#102c1c]">
                <ArrowUpRight size={18} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
