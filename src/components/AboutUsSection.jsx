import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const AboutUsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-[#f7f4ed] px-6 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">01 · Our approach</p>
            <h2 className="font-display text-balance text-[clamp(3rem,6vw,6.7rem)] font-light leading-[0.92] text-[#102c1c]">
              Places begin with the way people <span className="text-[#7a897f]">experience them.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-[#59665e] md:text-lg">
              We are reshaping the site around strong photography, generous space, clear information and subtle motion, so each development feels easier to understand and more memorable to explore.
            </p>
            <a href="/#contact" className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[#102c1c]">
              Talk to our team <span className="grid h-9 w-9 place-items-center rounded-full border border-[#102c1c]/20"><ArrowUpRight size={16} /></span>
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

            <div className="grid gap-px overflow-hidden rounded-[28px] bg-[#102c1c]/10 sm:grid-cols-3">
              {[
                ['04', 'Projects', 'One clear portfolio'],
                ['03', 'Living types', 'Plots · Villas · Apartments'],
                ['01', 'Purpose', 'Build trust through clarity'],
              ].map(([number, title, copy]) => (
                <div key={title} className="bg-[#fffdf8] p-7 md:p-9">
                  <span className="font-display text-5xl font-light text-[#1d6b3e]">{number}</span>
                  <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-[#102c1c]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#758079]">{copy}</p>
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
