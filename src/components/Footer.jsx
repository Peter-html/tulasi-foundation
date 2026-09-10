import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#dce8dd] px-6 pb-8 pt-16 text-[#102c1c] md:px-10 lg:px-14">
    <div className="mx-auto max-w-[1500px]">
      <div className="grid gap-12 border-b border-[#102c1c]/15 pb-14 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1d6b3e]">Tulasi Foundation</p>
          <p className="font-display mt-5 max-w-3xl text-[clamp(3rem,6vw,6rem)] font-light leading-[0.92] tracking-[-0.055em]">Plots, villas and apartments shaped around everyday life.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-self-end">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#748078]">Explore</p>
            <div className="space-y-2 text-sm">
              <a className="block hover:text-[#1d6b3e]" href="/projects">Projects</a>
              <a className="block hover:text-[#1d6b3e]" href="/#about">About</a>
              <a className="block hover:text-[#1d6b3e]" href="/#living">Living</a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#748078]">Contact</p>
            <a className="inline-flex items-center gap-2 text-sm hover:text-[#1d6b3e]" href="/#contact">Enquire <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-6 text-xs text-[#748078] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Tulasi Foundation</span>
        <span>Designed for a calmer way to explore real estate.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
