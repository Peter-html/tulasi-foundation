import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const AboutUsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section id="about" ref={ref} className="relative scroll-mt-28 md:scroll-mt-32 overflow-hidden bg-[#f7f4ed] px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">ABOUT TULASI</p>
            <h2 className="font-display text-balance text-[clamp(2.8rem,5.5vw,6rem)] font-light leading-[0.94] text-[#102c1c]">
              Places designed for living, growing and investing.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#59665e] md:text-lg">
              Tulasi Foundation develops residential plots, villas and apartments with a focus on good locations, practical planning and long-term value.
            </p>
            <a href="#projects" className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[#102c1c]">
              Know More <span className="grid h-9 w-9 place-items-center rounded-full border border-[#102c1c]/20"><ArrowUpRight size={16} /></span>
            </a>
          </div>

          <div className="space-y-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] md:aspect-[5/4]">
              <motion.img
                src="/projects/limelight/limelight-8.webp"
                alt="Aerial development view"
                loading="lazy"
                className="absolute -inset-y-[8%] h-[116%] w-full object-cover"
                style={{ y: imageY }}
              />
              <div className="absolute bottom-5 left-5 rounded-full bg-[#fffdf8]/92 px-4 py-2 text-xs font-semibold text-[#102c1c] backdrop-blur">Real site photography</div>
            </div>

            {/* Company Statistics (Placeholders marked clearly for easy updating) */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#102c1c]/10 sm:grid-cols-4">
              {[
                { value: '10+', label: 'Years of Experience', note: 'Established presence' },
                { value: '4', label: 'Current Projects', note: 'In Tamil Nadu' },
                // PLACEHOLDER: Replace '500+' with verified customer count when available
                { value: '500+', label: 'Happy Customers', note: 'Resident community' },
                // PLACEHOLDER: Replace '25+' with verified units delivered count when available
                { value: '25+', label: 'Plots / Homes Delivered', note: 'Quality spaces built' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#fffdf8] p-6 md:p-7">
                  <span className="font-display text-4xl font-light text-[#1d6b3e] md:text-5xl">{stat.value}</span>
                  <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#102c1c]">{stat.label}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#758079]">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
