import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '12+', label: 'LANDMARK PROJECTS' },
  { value: '1200+', label: 'VILLA PLOTS' },
  { value: '1000+', label: 'HAPPY CUSTOMERS' },
  { value: '50 Lakhs+', label: 'SQ.FT DELIVERED' },
  { value: '10 Lakhs+', label: 'SQ.FT IN PIPELINE' },
];

const AboutTeaserSection = () => {
  return (
    <section
      id="about"
      className="scroll-mt-28 md:scroll-mt-32 border-b border-[#102c1c]/10 bg-[#f7f4ed] px-6 py-16 md:px-10 md:py-20 lg:px-14"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
              ABOUT TULASI
            </p>
            <h2 className="font-display text-[clamp(2.4rem,4.8vw,4.5rem)] font-light leading-[0.96] tracking-[-0.045em] text-[#102c1c]">
              Places designed for
              <span className="block text-[#1d6b3e]">everyday living.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-center space-y-6 lg:border-l lg:border-[#102c1c]/15 lg:pl-12">
            <p className="max-w-xl text-base leading-7 text-[#5c6860] md:text-lg">
              Tulasi Foundation develops residential plots, villas and apartments across growing locations with attention to connectivity, disciplined planning and future value.
            </p>

            <div>
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 rounded-full bg-[#102c1c] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-[#1d6b3e]"
              >
                <span>Discover Tulasi</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#102c1c]">
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Metrics / Counter Bar (Matches reference: Landmark, Villa Plots, Happy Customers, Sq.Ft Delivered, Sq.Ft in Pipeline) */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#102c1c]/10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 divide-y md:divide-y-0 md:divide-x divide-[#102c1c]/10">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`flex flex-col items-center justify-center text-center px-3 sm:px-4 pt-4 md:pt-0 ${
                  index === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <span className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#102c1c]">
                  {stat.value}
                </span>
                <span className="mt-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-[#55635a]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaserSection;
