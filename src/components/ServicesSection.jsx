import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const items = [
  {
    no: '01',
    title: 'Plots',
    category: 'PLOTTED COMMUNITIES',
    image: '/photos/offering-plots.jpg',
    tagline: 'DTCP & RERA Approved Residential Layouts',
    copy: 'Approved residential plots in prime Tamil Nadu growth corridors featuring clear titles, wide blacktop roads, underground utilities, and compound security.',
    tags: ['100% Clear Title', 'Ready to Build', 'Bank Loan Approved'],
    linkText: 'Explore Plots',
  },
  {
    no: '02',
    title: 'Villas',
    category: 'INDEPENDENT LIVING',
    image: '/photos/offering-villas.jpg',
    tagline: 'Custom Luxury Homes & Private Estates',
    copy: 'Individual homes designed around generous natural sunlight, private garden spaces, contemporary stone and wood architecture, and generational longevity.',
    tags: ['Contemporary Design', 'Private Garden Lawn', 'Vastu Compliant'],
    linkText: 'Explore Villas',
  },
  {
    no: '03',
    title: 'Apartments',
    category: 'COMMUNITY LIVING',
    image: '/photos/offering-apartments.jpg',
    tagline: 'Modern Living in Connected Hubs',
    copy: 'Thoughtfully planned apartment communities located minutes away from reputed schools, healthcare centers, IT corridors, and everyday conveniences.',
    tags: ['24/7 Gated Security', 'Lifestyle Amenities', 'Strategic Urban Corridors'],
    linkText: 'Explore Apartments',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="living"
      className="scroll-mt-28 md:scroll-mt-32 bg-[#102c1c] px-6 py-24 text-white md:px-10 md:py-32 lg:px-14 relative overflow-hidden"
    >
      {/* Invisible anchor target for #offerings as well */}
      <span id="offerings" className="absolute -top-32" />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-[#1d6b3e]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-[#a9d4b5]/10 blur-3xl" />

      <div className="mx-auto max-w-[1500px] relative z-10">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a9d4b5]">
              02 · WHAT WE OFFER
            </p>
            <h2 className="font-display max-w-4xl text-[clamp(2.75rem,5.5vw,5.5rem)] font-light leading-[0.92] tracking-[-0.055em]">
              Three ways to find your place.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-6 text-white/70">
            Carefully selected locations, crystal-clear legal documentation, and practical layouts built for long-term living and lasting capital appreciation.
          </p>
        </div>

        {/* 3-Card Visual Grid with Generated Architectural Photography */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#143924]/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#a9d4b5]/40 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Visual Image Banner with Subtle Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0d2215]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#143924] via-transparent to-black/25" />

                  {/* Top Floating Badges */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-[#102c1c]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8f1dc] backdrop-blur-md">
                      {item.no} · {item.title}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-[#102c1c]/70 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:border-[#a9d4b5] group-hover:bg-[#a9d4b5] group-hover:text-[#102c1c]">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a9d4b5]">
                    {item.category}
                  </div>
                  <h3 className="font-display text-3xl font-light tracking-tight text-white group-hover:text-[#a9d4b5] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#d8f1dc]/90 mb-4">
                    {item.tagline}
                  </p>
                  <p className="text-sm leading-relaxed text-white/65 mb-6">
                    {item.copy}
                  </p>

                  {/* Trust Feature Pills */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                      >
                        <CheckCircle2 size={11} className="text-[#a9d4b5]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="border-t border-white/10 p-6 pt-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a9d4b5] transition-all group-hover:text-white"
                >
                  <span>{item.linkText}</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
