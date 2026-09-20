import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Home, Building2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DEVELOP_CATEGORIES = [
  {
    number: '01',
    title: 'PLOTS',
    tagline: 'Clear titles & planned layouts',
    description:
      'DTCP and RERA approved residential layouts situated along rapidly developing growth corridors, featuring wide internal avenues, well-laid drainage, and verified legal documentation.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Villas',
    tagline: 'Architectural modern living',
    description:
      'Custom and concept-led individual residences prioritizing passive cross-ventilation, abundant natural daylight, private outdoor courtyards, and flexible interior layouts.',
    icon: Home,
  },
  {
    number: '03',
    title: 'Apartments',
    tagline: 'Connected everyday communities',
    description:
      'Efficient, well-appointed apartment developments positioned close to established educational institutions, healthcare centers, transit lines, and everyday neighborhood amenities.',
    icon: Building2,
  },
];

const APPROACH_POINTS = [
  {
    number: '01',
    title: 'Location',
    description:
      'We identify fast-appreciating growth corridors with proven connectivity, ensuring every address offers practical day-to-day commute accessibility and sustainable capital appreciation.',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'Every plot layout and floor plan is conceived with architectural discipline—optimizing road widths, sunlight orientation, open space ratios, and spatial efficiency.',
  },
  {
    number: '03',
    title: 'Infrastructure',
    description:
      'From durable bituminous roads and secure perimeter boundary walls to underground cabling and rainwater drainage, we build durable groundwork built to endure.',
  },
  {
    number: '04',
    title: 'Long-term Value',
    description:
      '100% transparent legal documentation, clear title deeds, and disciplined project execution ensure your asset remains secure, bankable, and rewarding for generations.',
  },
];

/*
 * NOTE ON COMPANY STATISTICS:
 * The statistics below (10+, 4, 500+, 25+) are placeholders for visual structure and should
 * only be presented as factual historical records once verified figures are confirmed.
 */
const COMPANY_STATS = [
  // PLACEHOLDER: Verify exact founding year / experience span
  {
    value: '10+',
    label: 'Years of Experience',
    detail: 'Established presence in residential development',
  },
  // Active and delivered regional projects
  {
    value: '4',
    label: 'Projects',
    detail: 'Across strategic Tamil Nadu locations',
  },
  // PLACEHOLDER: Replace 500+ with verified customer count once available
  {
    value: '500+',
    label: 'Customers',
    detail: 'Families and investors in our network',
  },
  // PLACEHOLDER: Replace 25+ with verified plots / homes delivered once available
  {
    value: '25+',
    label: 'Plots / Homes',
    detail: 'Thoughtfully planned spaces delivered',
  },
];

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About | Tulasi Foundation';
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#102c1c]">
      <Header />

      <main>
        {/* =====================================================
            HERO SECTION
            Spacious architectural opening with real drone photo
        ====================================================== */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-36 px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 xl:gap-24">
              <div>
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                  ABOUT TULASI FOUNDATION
                </p>
                <h1 className="font-display text-[clamp(3.2rem,6.8vw,7.2rem)] font-light leading-[0.92] tracking-[-0.055em] text-[#102c1c]">
                  Building places
                  <span className="block text-[#1d6b3e]">for living,</span>
                  <span className="block">growing and</span>
                  <span className="block">investing.</span>
                </h1>
                <p className="mt-8 max-w-xl text-base leading-8 text-[#5c6860] md:text-lg">
                  Tulasi Foundation develops residential plots, villas and apartments with a focus on
                  well-connected locations, practical planning and long-term value.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#102c1c] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-[#1d6b3e]"
                  >
                    Explore Projects <ArrowUpRight size={15} />
                  </Link>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#102c1c]/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#102c1c] transition-all hover:bg-[#102c1c] hover:text-white"
                  >
                    Schedule Visit
                  </a>
                </div>
              </div>

              {/* Real Site Drone Photograph */}
              <div className="relative">
                <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden rounded-[32px] bg-[#102c1c] shadow-[0_20px_60px_rgba(16,44,28,0.12)]">
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src="/projects/limelight/limelight-4.webp"
                    alt="Aerial view of Tulasi residential development"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <span className="rounded-full bg-[#fffdf8]/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#102c1c] backdrop-blur-md">
                      Aerial site photography
                    </span>
                    <span className="text-[10px] font-medium tracking-wider text-white/80">
                      Tamil Nadu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 1: WHO WE ARE
            Editorial architectural statement & grounded focus
        ====================================================== */}
        <section className="border-t border-[#102c1c]/10 bg-[#f7f4ed] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                  01 · WHO WE ARE
                </p>
                <h2 className="font-display mt-4 text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.95] tracking-[-0.045em] text-[#102c1c]">
                  Creating places with purpose.
                </h2>
              </div>

              {/* NOTE: Text below can be modified if client supplies specific corporate history */}
              <div className="space-y-6 text-base leading-8 text-[#5c6860] md:text-lg">
                <p>
                  Tulasi Foundation is built upon a single, grounded premise: real estate should be
                  transparent, properly planned, and deeply respectful of the people who call it home.
                  Across residential plots, contemporary villas, and community apartments, we focus
                  uncompromisingly on foundational fundamentals.
                </p>
                <p>
                  Every location is selected for authentic connectivity—proximate to employment nodes,
                  reputable educational centers, and expanding regional infrastructure. Rather than
                  chasing speculative trends, our layouts prioritize clean statutory approvals,
                  spacious road networks, and enduring intrinsic value.
                </p>
                <div className="pt-4 border-t border-[#102c1c]/10 grid grid-cols-2 gap-6 sm:gap-10">
                  <div>
                    <span className="block font-display text-2xl font-light text-[#102c1c]">
                      Verified Land
                    </span>
                    <p className="mt-1 text-xs text-[#758079] leading-5">
                      DTCP & RERA compliant documentation for hassle-free ownership.
                    </p>
                  </div>
                  <div>
                    <span className="block font-display text-2xl font-light text-[#102c1c]">
                      Direct Accountability
                    </span>
                    <p className="mt-1 text-xs text-[#758079] leading-5">
                      Transparent guidance from initial enquiry to registered handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 2: WHAT WE DEVELOP
            3 Simple Categories: PLOTS, VILLAS, APARTMENTS
        ====================================================== */}
        <section className="border-t border-[#102c1c]/10 bg-[#fffdf8] px-6 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-14 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                02 · WHAT WE DEVELOP
              </p>
              <h2 className="font-display mt-3 text-[clamp(2.5rem,4.8vw,4.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-[#102c1c]">
                Three residential formats designed for enduring living.
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {DEVELOP_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={cat.title}
                    className="flex flex-col justify-between rounded-[28px] border border-[#102c1c]/10 bg-[#f7f4ed] p-8 md:p-10 transition-all duration-300 hover:border-[#1d6b3e]/40 hover:shadow-[0_12px_32px_rgba(16,44,28,0.06)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-[0.2em] text-[#1d6b3e]">
                          {cat.number}
                        </span>
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#102c1c]/5 text-[#102c1c]">
                          <IconComponent size={18} />
                        </span>
                      </div>

                      <h3 className="font-display mt-8 text-4xl font-light tracking-[-0.04em] text-[#102c1c]">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1d6b3e]">
                        {cat.tagline}
                      </p>

                      <p className="mt-5 text-sm leading-7 text-[#5c6860]">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#102c1c]/10">
                      <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#102c1c] hover:text-[#1d6b3e] transition-colors"
                      >
                        View Developments <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 3: OUR APPROACH
            Four Points with large editorial numbering
        ====================================================== */}
        <section className="border-t border-[#102c1c]/10 bg-[#f7f4ed] px-6 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-16 max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                03 · OUR APPROACH
              </p>
              <h2 className="font-display mt-3 text-[clamp(2.5rem,5.2vw,5rem)] font-light leading-[0.95] tracking-[-0.045em] text-[#102c1c]">
                A disciplined methodology behind every square yard.
              </h2>
            </div>

            <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {APPROACH_POINTS.map((point) => (
                <div key={point.title} className="border-t border-[#102c1c]/15 pt-6">
                  <span className="font-display text-4xl sm:text-5xl font-light text-[#1d6b3e]">
                    {point.number}
                  </span>
                  <h3 className="font-display mt-4 text-2xl font-light tracking-tight text-[#102c1c]">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5c6860]">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 4: COMPANY NUMBERS
            Clean visual stats grid (clearly marked placeholder notice)
        ====================================================== */}
        <section className="border-t border-[#102c1c]/10 bg-[#fffdf8] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1d6b3e]">
                  04 · MILESTONES
                </p>
                <h2 className="font-display mt-2 text-3xl sm:text-4xl font-light tracking-tight text-[#102c1c]">
                  Built on measurable trust.
                </h2>
              </div>
              <p className="text-xs text-[#758079] max-w-xs">
                Performance indicators reflecting our regional footprint and dedication to quality delivery.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#102c1c]/12 sm:grid-cols-4">
              {COMPANY_STATS.map((stat) => (
                <div key={stat.label} className="bg-[#fffdf8] p-7 md:p-9">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#1d6b3e]">
                    {stat.value}
                  </span>
                  <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#102c1c]">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#758079]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 5: FULL-WIDTH REAL PROJECT PHOTOGRAPH
            With simple statement
        ====================================================== */}
        <section className="relative px-4 py-8 md:px-8 md:py-12">
          <div className="relative mx-auto max-w-[1560px] overflow-hidden rounded-[36px] bg-[#102c1c]">
            <div className="relative aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[560px] w-full">
              <img
                src="/projects/limelight/limelight-8.webp"
                alt="Tulasi Foundation aerial project view"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 lg:p-20 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a9d4b5]">
                  05 · REAL SITE PHOTOGRAPHY
                </span>
                <p className="font-display mt-4 max-w-4xl text-[clamp(2.2rem,4.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.04em]">
                  “Thoughtfully planned developments in growing locations.”
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-white/70">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a9d4b5]" />
                  <span>Aerial view from Limelight plotted development, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION 6: CTA
            Looking for the right place?
        ====================================================== */}
        <section className="bg-[#f7f4ed] px-6 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="rounded-[36px] bg-[#102c1c] px-8 py-16 text-center text-white sm:px-12 md:py-24 lg:py-28 shadow-[0_24px_70px_rgba(16,44,28,0.14)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a9d4b5]">
                06 · NEXT STEPS
              </p>
              <h2 className="font-display mx-auto mt-4 max-w-3xl text-[clamp(2.8rem,5.5vw,5.5rem)] font-light leading-[0.95] tracking-[-0.045em]">
                Looking for the right place?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg">
                Explore our portfolio of ongoing and upcoming projects, or schedule an escorted site
                visit with our advisory team today.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#102c1c] transition-all hover:bg-[#a9d4b5] hover:text-[#102c1c]"
                >
                  Explore Projects <ArrowUpRight size={15} />
                </Link>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-white/15"
                >
                  Book a Site Visit
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
