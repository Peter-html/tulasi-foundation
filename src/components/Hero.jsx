import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ playVideo = true }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.13]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playVideo) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [playVideo]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-[100svh] min-h-[720px] overflow-hidden bg-[#0d2116] text-white"
    >
      <motion.video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/projects/limelight/limelight-2.webp"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: videoY, scale: videoScale }}
      >
        <source src="/videos/hero/tulasi-hero.mp4" type="video/mp4" />
      </motion.video>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,14,0.76)_0%,rgba(5,24,14,0.45)_38%,rgba(5,24,14,0.16)_68%,rgba(5,24,14,0.05)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(4,20,12,0.76)_0%,rgba(4,20,12,0.28)_32%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] arch-grid" />

      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-10 md:px-10 md:pb-14 lg:px-14"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="mb-auto pt-36 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: playVideo ? 1 : 0, y: playVideo ? 0 : 18 }}
            transition={{ duration: 0.8, delay: playVideo ? 0.25 : 0 }}
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80"
          >
            <span className="h-px w-12 bg-white/60" />
            TULASI FOUNDATION
          </motion.div>
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[1fr_390px]">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: playVideo ? 1 : 0, y: playVideo ? 0 : 50 }}
            transition={{
              duration: 1.05,
              delay: playVideo ? 0.35 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display max-w-5xl text-[clamp(3.5rem,8vw,8.5rem)] font-light leading-[0.88] tracking-[-0.055em]"
          >
            Plots. Villas. Apartments.
            <span className="block text-[#d8f1dc]">Built around better living.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: playVideo ? 1 : 0, y: playVideo ? 0 : 30 }}
            transition={{ duration: 0.9, delay: playVideo ? 0.65 : 0 }}
            className="pb-3 lg:pb-6"
          >
            <p className="max-w-md text-sm leading-6 text-white/85 md:text-base">
              Explore thoughtfully planned residential projects in growing locations across Tamil Nadu.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102c1c] transition-all hover:bg-[#d8f1dc] hover:scale-[1.02]"
              >
                Explore Projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/15"
              >
                Book Site Visit
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: playVideo ? 1 : 0 }}
          transition={{ duration: 0.8, delay: playVideo ? 0.9 : 0 }}
          className="mt-8 flex items-center justify-between border-t border-white/25 pt-5 text-xs uppercase tracking-[0.18em] text-white/60"
        >
          <span>Tulasi Foundation · Featured development</span>
          <a href="#about" className="flex items-center gap-2 transition-colors hover:text-white">
            Scroll to discover <ArrowDown size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
