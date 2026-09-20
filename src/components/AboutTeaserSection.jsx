import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
      </div>
    </section>
  );
};

export default AboutTeaserSection;
