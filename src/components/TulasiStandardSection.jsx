import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { contactConfig } from '../config/contact';

const STATS = [
  {
    value: '15+',
    label: 'Years of Excellence',
    detail: 'Delivering genuine, dispute-free plots across Tamil Nadu with 100% honesty.',
  },
  {
    value: '3,500+',
    label: 'Happy Plot Owners',
    detail: 'Middle-class families and smart investors living peacefully in our layouts.',
  },
  {
    value: '100%',
    label: 'Clear Legal Titles',
    detail: '30-year parent document history vetted by senior High Court advocates.',
  },
  {
    value: '100%',
    label: 'DTCP & RERA Approved',
    detail: 'Fully authorized layout plans with wide roads. Zero risk of government notices.',
  },
];

const TulasiStandardSection = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section id="standard" className="scroll-mt-28 md:scroll-mt-32 bg-[#fbf9f4] px-6 py-20 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-[#102c1c]/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#102c1c]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1d6b3e] mb-4">
              <ShieldCheck size={14} className="text-[#1d6b3e]" />
              03 · WHY FAMILIES TRUST US
            </div>
            <h2 className="font-display text-[clamp(2.4rem,5vw,5rem)] font-light leading-[0.96] tracking-[-0.04em] text-[#102c1c]">
              Buying Land Made Simple, Safe & Honest.
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#3d5345] leading-relaxed max-w-2xl">
              Buying a plot is one of life’s biggest decisions. You shouldn't have to worry about fake documents, confusing legal terms, or unapproved layouts. Here is how we make sure your hard-earned money stays 100% safe.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#102c1c] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-[#1d6b3e] shadow-[0_4px_16px_rgba(16,44,28,0.12)] text-center"
            >
              <span>Verify Documents Free</span>
              <ArrowRight size={15} />
            </a>
            <a
              href={`tel:${contactConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#102c1c]/20 bg-white/70 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#102c1c] transition-all hover:bg-white hover:border-[#1d6b3e] text-center"
            >
              <PhoneCall size={14} className="text-[#1d6b3e]" />
              <span>Call Us: {contactConfig.phone}</span>
            </a>
          </div>
        </div>

        {/* 4 Proof Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group rounded-2xl border border-[#102c1c]/10 bg-white p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all hover:border-[#1d6b3e]/40 hover:shadow-[0_8px_24px_rgba(29,107,62,0.08)]"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display text-4xl sm:text-5xl font-light text-[#102c1c] tracking-tight group-hover:text-[#1d6b3e] transition-colors">
                  {stat.value}
                </div>
                <CheckCircle2 size={18} className="text-[#1d6b3e]/60 group-hover:text-[#1d6b3e] transition-colors" />
              </div>
              <div className="mt-3 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#1d6b3e]">
                {stat.label}
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5c6860]">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TulasiStandardSection;

