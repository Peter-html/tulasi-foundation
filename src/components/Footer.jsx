import React from 'react';
import { Link } from 'react-router-dom';
import { contactConfig } from '../config/contact';

const Footer = () => (
  <footer className="bg-[#dce8dd] px-6 pb-8 pt-16 text-[#102c1c] md:px-10 lg:px-14">
    <div className="mx-auto max-w-[1500px]">
      <div className="grid gap-12 border-b border-[#102c1c]/15 pb-14 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1d6b3e]">
            Tulasi Foundation
          </p>
          <p className="font-display mt-5 max-w-3xl text-[clamp(2.5rem,5vw,5.5rem)] font-light leading-[0.92] tracking-[-0.05em]">
            Plots, villas and apartments built around better living.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:justify-self-end">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#748078]">
              Explore
            </p>
            <div className="space-y-2.5 text-sm">
              <Link className="block hover:text-[#1d6b3e] transition-colors" to="/projects">
                Projects Portfolio
              </Link>
              <Link className="block hover:text-[#1d6b3e] transition-colors" to="/about">
                About Tulasi
              </Link>
              <a className="block hover:text-[#1d6b3e] transition-colors" href="/#living">
                Plots, Villas & Apts
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#748078]">
              Contact
            </p>
            <div className="space-y-2 text-sm">
              <a
                className="block hover:text-[#1d6b3e] transition-colors"
                href={`tel:${contactConfig.phoneRaw}`}
              >
                {contactConfig.phone}
              </a>
              <a
                className="block hover:text-[#1d6b3e] transition-colors break-all"
                href={`mailto:${contactConfig.email}`}
              >
                {contactConfig.email}
              </a>
              <p className="text-xs text-[#5c6860] pt-1">
                {contactConfig.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 py-6 text-xs text-[#748078] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Tulasi Foundation. All rights reserved.</span>
        <span>Residential plots and architectural homes across Tamil Nadu.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
