import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, ShieldCheck, Users, Cpu, Layers } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CompanyTimeline from '../components/CompanyTimeline';

// 4 Core Identity Bullets matching reference Screenshots 1 & 2
const CORE_PILLARS = [
  {
    title: 'The right property starts with thoughtful planning.',
    body: (
      <>
        We develop <strong className="font-semibold text-[#102c1c]">DTCP and RERA-approved plots, villas, and apartments</strong>, planned around strategic growth locations, regional connectivity, high-grade infrastructure, and sustained capital appreciation.
      </>
    ),
  },
  {
    title: 'Trust is at the heart of our customer experience.',
    body: (
      <>
        From initial consultation to clear title registration, we emphasize <strong className="font-semibold text-[#102c1c]">100% verified legal documentation, transparent processes, timely communication</strong>, and uncompromising construction execution.
      </>
    ),
  },
  {
    title: 'Expertise shapes every part of the experience.',
    body: (
      <>
        Our multidisciplinary team brings together <strong className="font-semibold text-[#102c1c]">civil engineers, master architects, urban planners, and legal compliance experts</strong> to deliver enduring living spaces without administrative friction.
      </>
    ),
  },
  {
    title: 'Technology makes the property journey simpler and more connected.',
    body: (
      <>
        From exploring projects via interactive 3D architectural models and aerial drone footage to direct digital booking support, our platforms ensure complete visibility at every stage.
      </>
    ),
  },
];

// Key Metrics / Counter Bar matching Screenshot 2
const STATS = [
  { value: '12+', label: 'LANDMARK PROJECTS' },
  { value: '1200+', label: 'VILLA PLOTS' },
  { value: '1000+', label: 'HAPPY CUSTOMERS' },
  { value: '50 Lakhs+', label: 'SQ.FT DELIVERED' },
  { value: '10 Lakhs+', label: 'SQ.FT IN PIPELINE' },
];

const DEVELOP_CATEGORIES = [
  {
    number: '01',
    title: 'Plotted Layouts',
    tagline: 'DTCP & RERA Approved',
    description:
      'Gated plotted developments with wide tar roads, underground electricity conduits, rainwater channels, and clean titles.',
    link: '/projects',
  },
  {
    number: '02',
    title: 'Custom Villas',
    tagline: 'Architectural Craftsmanship',
    description:
      'Individually designed modern residences built around natural light, cross-ventilation, private gardens, and enduring finishes.',
    link: '/projects',
  },
  {
    number: '03',
    title: 'Connected Communities',
    tagline: 'Scenic & Prime Locations',
    description:
      'Masterplanned neighborhoods located close to key transit highways, educational institutions, and employment corridors.',
    link: '/projects',
  },
];

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us | Tulasi Foundation';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#102c1c] selection:bg-[#1d6b3e] selection:text-white">
      <Header />

      <main className="overflow-hidden">
        {/* =========================================================
            TOP BRAND BANNER (Inspired by Screenshot 1 top header)
        ========================================================= */}
        <section className="pt-28 pb-4 md:pt-36 md:pb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-col items-center"
          >
            <span className="font-display text-lg sm:text-xl font-bold tracking-[0.3em] text-[#102c1c]">
              TULASI FOUNDATION
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.34em] text-[#1d6b3e]">
              BUILT AROUND BETTER LIVING
            </span>
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 1: ARCHED AMBASSADOR PHOTO WITH SEAMLESS FADE
            (Direct replica of Screenshot 1 visual layout)
        ========================================================= */}
        <section className="relative px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            {/* Arched Photo Frame with Asymmetrical Radius & Seamless Bottom Gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto overflow-hidden rounded-tl-[140px] sm:rounded-tl-[200px] md:rounded-tl-[280px] rounded-tr-[30px] sm:rounded-tr-[60px] md:rounded-tr-[80px] bg-[#f8f6f0] shadow-[0_20px_60px_rgba(16,44,28,0.08)]"
            >
              <img
                src="/photos/brand-ambassador.jpg"
                alt="Tulasi Foundation Ambassador"
                className="h-[360px] sm:h-[480px] md:h-[620px] w-full object-cover object-top"
              />

              {/* Seamless Bottom Fade Gradient: Dissolves photo directly into white page background */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 md:h-72 bg-gradient-to-t from-white via-white/75 to-transparent" />
            </motion.div>

            {/* "OUR STORY" Heading overlay/transition below image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative -mt-10 sm:-mt-14 md:-mt-18 z-10 text-left pl-2 sm:pl-6"
            >
              <h2 className="text-[clamp(2.4rem,6.5vw,5rem)] font-light tracking-[0.06em] text-[#102c1c]">
                OUR <span className="font-bold text-[#1d6b3e]">STORY</span>
              </h2>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: "Who we are?" & DETAILED PILLARS
            (Matches Screenshot 1 & 2 content and typography)
        ========================================================= */}
        <section className="pt-8 pb-20 md:pb-28 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            {/* Section Heading */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-[clamp(2.8rem,7vw,5.6rem)] font-light tracking-tight text-[#102c1c] leading-[1.05]"
            >
              Who <span className="font-bold text-[#102c1c]">we</span> are?
            </motion.h3>

            {/* Intro Lead Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-[#4a554f]"
            >
              <p>
                <strong className="font-bold text-[#102c1c]">
                  Born in Tamil Nadu, built with a lasting vision.
                </strong>{' '}
                Tulasi Foundation has grown from its civil engineering and infrastructure roots into a distinguished Real Estate & Development company serving customers across Tamil Nadu, India, and overseas.
              </p>
            </motion.div>

            {/* Bullet Points with Diamond Indicator (Screenshots 1 & 2) */}
            <div className="mt-10 sm:mt-12 space-y-7 sm:space-y-8">
              {CORE_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="flex items-start gap-3.5 sm:gap-4.5"
                >
                  {/* Diamond Icon Indicator matching reference */}
                  <span className="mt-1.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 items-center justify-center text-[#1d6b3e]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                      <polygon points="12 2 22 12 12 22 2 12" />
                    </svg>
                  </span>

                  <div className="text-sm sm:text-base leading-relaxed text-[#4a554f]">
                    <p>
                      <strong className="font-bold text-[#102c1c]">{pillar.title}</strong>{' '}
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: KEY METRICS / STATISTICS STRIP
            (Direct replica of Screenshot 2 horizontal counter bar)
        ========================================================= */}
        <section className="border-y border-black/10 bg-[#faf8f4] py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 divide-y md:divide-y-0 md:divide-x divide-black/10">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col items-center justify-center text-center px-4 pt-4 md:pt-0 ${
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
        </section>

        {/* =========================================================
            SECTION 4: INTERACTIVE MILESTONE TIMELINE
            (Direct replica of Screenshot 3 dark luxury journey)
        ========================================================= */}
        <CompanyTimeline />

        {/* =========================================================
            SECTION 5: WHAT WE DEVELOP (PLOTS, VILLAS, COMMUNITIES)
        ========================================================= */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-14 bg-[#faf8f4]">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-14 max-w-2xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                PORTFOLIO DISCIPLINES
              </p>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#102c1c]">
                Three residential formats built to endure.
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {DEVELOP_CATEGORIES.map((cat, idx) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="flex flex-col justify-between rounded-[24px] border border-black/8 bg-white p-8 transition-all duration-300 hover:border-[#1d6b3e]/40 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#1d6b3e]">
                      {cat.number}
                    </span>
                    <h3 className="font-display mt-6 text-2xl sm:text-3xl font-light text-[#102c1c]">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#1d6b3e]">
                      {cat.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#5c6860]">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-black/8">
                    <Link
                      to={cat.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#102c1c] hover:text-[#1d6b3e] transition-colors"
                    >
                      Explore Developments <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: CALL TO ACTION (EXPLORE OR BOOK VISIT)
        ========================================================= */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-14 bg-white">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-[32px] bg-[#102c1c] px-8 py-16 text-center text-white sm:px-14 sm:py-20 shadow-[0_24px_70px_rgba(16,44,28,0.2)]"
            >
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86efac]">
                NEXT STEPS
              </span>
              <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Ready to find the place that fits your future?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
                Explore our ongoing and upcoming masterplanned communities across Tamil Nadu, or arrange a private site visit today.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#102c1c] transition-all hover:bg-[#86efac] hover:text-[#102c1c]"
                >
                  Explore Projects <ArrowUpRight size={15} />
                </Link>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-white/10"
                >
                  Schedule a Site Visit
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
